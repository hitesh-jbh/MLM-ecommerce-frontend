import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CheckCircle2, ShieldCheck, Loader2, ArrowLeft, CreditCard, Plus, MapPin } from 'lucide-react';
import { getAddress, createOrder, saveAddress, createPaymentOrder, verifyPaymentOrder } from '../../utils/service/apiService'; 
import AddressModal from '../../components/skeleton/AddressModal';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { token } = useSelector((state) => state.auth);
    
    const { checkoutItems = [], totalAmount = 0, source = "" } = location.state || {};

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); 
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [orderPending, setOrderPending] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    
    // Redirecting स्क्रीन दिखाने के लिए
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!token) { navigate('/login'); return; }
        if (!location.state || checkoutItems.length === 0) { 
            toast.error("No items to checkout");
            navigate('/'); 
            return; 
        }

        const loadRazorpay = () => {
            return new Promise((resolve, reject) => {
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    resolve(true);
                    return;
                }

                if (!document.getElementById("razorpay-checkout")) {
                    const script = document.createElement("script");
                    script.id = "razorpay-checkout";
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.async = true;
                    script.onload = () => {
                        setRazorpayLoaded(true);
                        resolve(true);
                    };
                    script.onerror = (e) => {
                        setRazorpayLoaded(false);
                        console.error('Failed to load Razorpay script', e);
                        reject(e);
                    };
                    document.body.appendChild(script);
                } else {
                    const checkInterval = setInterval(() => {
                        if (window.Razorpay) {
                            clearInterval(checkInterval);
                            setRazorpayLoaded(true);
                            resolve(true);
                        }
                    }, 200);
                    setTimeout(() => {
                        clearInterval(checkInterval);
                        if (!window.Razorpay) {
                            reject(new Error('Razorpay SDK load timeout'));
                        }
                    }, 8000);
                }
            });
        };
        loadRazorpay().catch(() => {});

        fetchAddresses();
    }, [token, checkoutItems, navigate]);

    const fetchAddresses = async () => {
        try {
            const res = await getAddress(token);
            const data = res.data?.items || res.data?.data || res.data || [];
            const addressList = Array.isArray(data) ? data : [];
            
            setAddresses(addressList);
            
            if (addressList.length > 0 && !selectedAddress) {
                setSelectedAddress(addressList[0]);
            }
        } catch (err) {
            toast.error(err, "Could not load addresses");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) return toast.warning("Please select a delivery address");
        
        setOrderPending(true);

        const isOnlinePayment = paymentMethod !== 'Cash on Delivery';

        const orderData = {
            items: checkoutItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            address: {
                full_name: selectedAddress.full_name,
                street_address: selectedAddress.street_address,
                apartment: selectedAddress.apartment || "",
                city: selectedAddress.city,
                zip: selectedAddress.zip,
                phone: selectedAddress.phone
            },
            payment_method: isOnlinePayment ? 'ONLINE' : 'COD',
            source: source 
        };

        try {
            const res = await createOrder(token, orderData);
            
            if (source === "CART") {
                queryClient.invalidateQueries({ queryKey: ["cart", token] });
            }

            if (isOnlinePayment) {
                const orderIdDb = res.data?.data?.orderId || res.data?.orderId || res.data?.data?._id || res.data?.data?.id || res.data?.id;

                if (!orderIdDb) {
                    toast.error("Order setup incomplete. Please try again.");
                    setOrderPending(false);
                    return;
                }
                
                let prRes;
                try {
                    prRes = await createPaymentOrder({ orderId: orderIdDb, amount: Number(totalAmount) });
                } catch (err) {
                    toast.error(err?.response?.data?.message || err.message || 'Failed to create payment order');
                    setOrderPending(false);
                    return;
                }

                const rzpOrderId = prRes?.data?.data?.id || prRes?.data?.id || prRes?.data?.razorpay_order_id || prRes?.data?.order_id;

                if (!window.Razorpay) {
                    toast.error('Payment SDK loading failed.');
                    setOrderPending(false);
                    return;
                }

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder", 
                    amount: Number(totalAmount) * 100, 
                    currency: "INR",
                    name: "Checkout",
                    description: `Order #${orderIdDb}`,
                    order_id: rzpOrderId,
                    handler: async function (response) {
                        setOrderPending(true);
                        try {
                            await verifyPaymentOrder({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: orderIdDb
                            });
                            
                            // 👇 Online Payment Success: Redirecting fix
                            setIsRedirecting(true);
                            setTimeout(() => {
                                navigate('/profile/your-order', { replace: true });
                            }, 2500);

                        } catch (err) {
                            toast.error(err, "Verification failed");
                            setOrderPending(false);
                        }
                    },
                    modal: {
                        ondismiss: function() {
                           setOrderPending(false);
                           toast.warning("Payment cancelled by user. Order is pending.");
                        }
                    },
                    theme: { color: "#9333ea" } 
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response){
                    toast.error("Payment failed: " + response.error.description);
                });
                rzp.open();

            } else {
                // 👇 COD Success: Redirecting fix
                setIsRedirecting(true);
                setTimeout(() => {
                    navigate('/profile/your-order', { replace: true });
                }, 2500);
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Order failed");
            setOrderPending(false);
        }
    };

    const handleSaveNewAddress = async (formData) => {
        setIsSaving(true);
        try {
            await saveAddress(token, formData);
            toast.success("Address added");
            setIsModalOpen(false);
            await fetchAddresses(); 
        } catch (err) {
            toast.error(err, "Failed to save address");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-dirora-purple" size={40} />
        </div>
    );

    // शानदार Redirect Screen
    if (isRedirecting) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={50} className="text-green-500 animate-in zoom-in duration-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-dirora-dark mb-4 tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-500 font-medium mb-8">Thank you for shopping with us. Your order has been placed successfully.</p>
            <div className="flex items-center gap-2 text-sm font-bold text-dirora-purple uppercase tracking-widest bg-purple-50 px-6 py-3 rounded-full">
                <Loader2 size={16} className="animate-spin" />
                Redirecting to your orders...
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 md:p-12">
            <AddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveNewAddress} 
                isSaving={isSaving} 
            />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-dirora-purple transition-colors">
                        <ArrowLeft size={16}/> Back to Cart
                    </button>

                    <section>
                        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                            <h2 className="text-xl md:text-2xl font-serif font-black tracking-tight text-dirora-dark">1. Delivery Address</h2>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center gap-1 text-[10px] font-bold uppercase bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm transition-all hover:bg-purple-50 hover:text-dirora-purple hover:border-purple-200"
                            >
                                <Plus size={14}/> Add New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.length > 0 ? (
                                addresses.map((addr) => {
                                    const addrId = addr._id || addr.id;
                                    const isSelected = (selectedAddress?._id || selectedAddress?.id) === addrId;
                                    
                                    return (
                                        <div 
                                            key={addrId} 
                                            onClick={() => setSelectedAddress(addr)} 
                                            className={`p-6 border rounded-2xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-dirora-purple bg-[#f8f5ff] shadow-sm' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/30'}`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <p className={`text-sm font-bold uppercase ${isSelected ? 'text-dirora-purple' : 'text-gray-800'}`}>{addr.full_name}</p>
                                                {isSelected && <CheckCircle2 size={18} className="text-dirora-purple" />}
                                            </div>
                                            <p className="text-xs text-gray-500 uppercase leading-relaxed mt-2">
                                                {addr.street_address}{addr.apartment ? `, ${addr.apartment}` : ''}<br/>
                                                {addr.city}, {addr.zip}<br/>
                                                <span className="font-medium mt-1 block text-gray-700">PH: {addr.phone}</span>
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-1 md:col-span-2 p-8 border border-dashed border-red-200 bg-red-50 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                        <MapPin className="w-6 h-6 animate-bounce" />
                                    </div>
                                    <div>
                                        <p className="text-red-600 text-sm font-black uppercase tracking-widest mb-1">Address Required</p>
                                        <p className="text-xs text-red-400 font-medium">Please add a delivery address to continue with your checkout.</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsModalOpen(true)} 
                                        className="mt-3 text-xs font-bold uppercase bg-red-600 text-white px-6 py-2.5 rounded-full tracking-wider hover:bg-red-700 transition-colors shadow-sm"
                                    >
                                        Add Address Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-serif font-black tracking-tight text-dirora-dark border-b border-gray-100 pb-3 mb-6">
                            <CreditCard size={20} className="text-gray-400" /> 2. Payment Method
                        </h2>
                        <div className="space-y-3">
                            {['Cash on Delivery', 'Online Payment'].map((m) => (
                                <label 
                                    key={m} 
                                    className={`flex items-center p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === m ? 'border-dirora-purple bg-[#f8f5ff] shadow-sm' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/30'}`}
                                >
                                    <input 
                                        type="radio" 
                                        name="payment"
                                        className="hidden" 
                                        onChange={() => setPaymentMethod(m)} 
                                        checked={paymentMethod === m} 
                                    />
                                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === m ? 'border-dirora-purple' : 'border-gray-300'}`}>
                                        {paymentMethod === m && <div className="w-2 h-2 rounded-full bg-dirora-purple" />}
                                    </div>
                                    <span className={`text-sm font-bold uppercase tracking-wide ${paymentMethod === m ? 'text-dirora-purple' : 'text-gray-700'}`}>{m}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-[#f8f5ff] border border-purple-100 p-8 rounded-[1.5rem] sticky top-12 shadow-sm">
                        <h3 className="text-2xl font-serif font-black mb-6 text-center border-b border-purple-200/60 pb-4 text-dirora-dark">Order Summary</h3>
                        
                        <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            {checkoutItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.name}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide w-32 truncate">{item.name}</span>
                                            <span className="text-[10px] text-gray-500 font-medium mt-0.5">QTY: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-dirora-dark">₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-purple-200/60 pt-6 mb-8 space-y-6">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                                <span className="text-gray-500">SHIPPING</span>
                                <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px]">FREE</span>
                            </div>
                            <div className="flex justify-between items-center font-serif tracking-tight">
                                <span className="text-2xl font-black text-gray-700">TOTAL</span>
                                <span className="text-3xl font-black text-dirora-dark">₹{Number(totalAmount).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder} 
                            disabled={orderPending || !selectedAddress || (paymentMethod === 'Online Payment' && !razorpayLoaded)} 
                            className={`w-full py-4 md:py-5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm
                            ${orderPending || !selectedAddress ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98]'}`}
                        >
                            {orderPending ? <Loader2 className="animate-spin" /> : "COMPLETE ORDER"}
                        </button>

                        {paymentMethod === 'Online Payment' && !razorpayLoaded && (
                            <div className="mt-3 text-[10px] text-center text-red-500 font-medium">Waiting for payment SDK to load — try again in a moment.</div>
                        )}

                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                            <ShieldCheck size={14} className="text-green-500" /> 100% SECURE CHECKOUT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;