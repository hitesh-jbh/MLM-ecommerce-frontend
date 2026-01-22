import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';
import { CheckCircle2, ShieldCheck, Loader2, ArrowLeft, CreditCard, Plus } from 'lucide-react';
import { getAddress, createOrder, saveAddress } from '../../utils/service/apiService'; 
import AddressModal from '../../components/skeleton/AddressModal';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const { token } = useSelector((state) => state.auth);
    
    const { checkoutItems = [], totalAmount = 0, source = "" } = location.state || {};

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); 
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [orderPending, setOrderPending] = useState(false);

    useEffect(() => {
        if (!token) { navigate('/login'); return; }
        if (!location.state || checkoutItems.length === 0) { 
            toast.error("No items to checkout");
            navigate('/'); 
            return; 
        }
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
            toast.error("Could not load addresses");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) return toast.warning("Please select a delivery address");
        
        setOrderPending(true);

        // FIX: Ensure these strings match your DB column length (VARCHAR)
        // If your DB is set to VARCHAR(10), 'NETBANKING' will fail. 
        // Use shorter codes if necessary.
        const paymentMap = {
            'Credit or Debit card': 'CARD',
            'Net Banking': 'NETBANKING', 
            'UPI / Scan & Pay': 'UPI',
            'Cash on Delivery': 'COD'
        };

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
            payment_method: paymentMap[paymentMethod] || 'COD',
            source: source 
        };

        try {
            await createOrder(token, orderData);
            
            if (source === "CART") {
                await mutate(["/api/cart/", token]);
            }

            toast.success("Order Placed Successfully!");
            navigate('/', { replace: true });
        } catch (err) {
            // This captures the "Data truncated" error from the server
            toast.error(err.response?.data?.message || "Order failed");
        } finally {
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
            toast.error("Failed to save address");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-black" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-black p-4 md:p-12">
            <AddressModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveNewAddress} 
                isSaving={isSaving} 
            />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <ArrowLeft size={16}/> Back
                    </button>

                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-black uppercase tracking-widest">1. Delivery Address</h2>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center gap-1 text-[10px] font-bold uppercase border border-black px-3 py-1.5 transition-all hover:bg-black hover:text-white"
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
                                            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${isSelected ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-60 hover:opacity-100'}`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-xs font-black uppercase">{addr.full_name}</p>
                                                {isSelected && <CheckCircle2 size={18} className="text-black" />}
                                            </div>
                                            <p className="text-[11px] text-zinc-500 uppercase leading-relaxed">
                                                {addr.street_address}{addr.apartment ? `, ${addr.apartment}` : ''}<br/>
                                                {addr.city}, {addr.zip}<br/>
                                                PH: {addr.phone}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-2 py-10 border-2 border-dashed rounded-2xl text-center text-zinc-400 text-xs font-bold uppercase">
                                    No addresses found. Please add one.
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">
                            <CreditCard size={18} /> 2. Payment Method
                        </h2>
                        <div className="space-y-3">
                            {['Credit or Debit card', 'Net Banking', 'UPI / Scan & Pay', 'Cash on Delivery'].map((m) => (
                                <label 
                                    key={m} 
                                    className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === m ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-60'}`}
                                >
                                    <input 
                                        type="radio" 
                                        name="payment"
                                        className="hidden" 
                                        onChange={() => setPaymentMethod(m)} 
                                        checked={paymentMethod === m} 
                                    />
                                    <span className="text-xs font-black uppercase tracking-widest">{m}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="border-2 border-black p-8 rounded-[1.5rem] sticky top-12 bg-white shadow-sm">
                        <h3 className="text-xs font-black uppercase mb-8 text-center border-b pb-4 tracking-[0.2em] text-zinc-300">ORDER SUMMARY</h3>
                        
                        <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            {checkoutItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center gap-4 text-xs font-black">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 bg-zinc-100 rounded-lg overflow-hidden border">
                                            <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.name}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="uppercase tracking-tight leading-tight w-32 truncate">{item.name}</span>
                                            <span className="text-zinc-400">QTY: {item.quantity}</span>
                                        </div>
                                    </div>
                                    {/* FIX: Use Number() to prevent toFixed errors */}
                                    <span className="text-sm">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-black pt-6 mb-8 space-y-6">
                            <div className="flex justify-between text-xs font-black uppercase">
                                <span className="text-zinc-400">SHIPPING</span>
                                <span className="text-green-500">FREE</span>
                            </div>
                            <div className="flex justify-between items-center text-2xl font-black uppercase tracking-tighter">
                                <span className="text-3xl">TOTAL</span>
                                <span className="text-3xl">₹{Number(totalAmount).toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder} 
                            disabled={orderPending || !selectedAddress} 
                            className={`w-full py-6 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2
                            ${orderPending || !selectedAddress ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-900 active:scale-95'}`}
                        >
                            {orderPending ? <Loader2 className="animate-spin" /> : "COMPLETE ORDER"}
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-zinc-300 tracking-widest">
                            <ShieldCheck size={14} /> 100% SECURE CHECKOUT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { Plus, CheckCircle2, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
// import { getAddress, saveAddress, createOrder } from '../../utils/service/apiService';
// import AddressModal from '../../components/skeleton/AddressModal';

// const CheckoutPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { token, user } = useSelector((state) => state.auth);
//     const { checkoutItems = [], totalAmount = 0 } = location.state || {};

//     const [addresses, setAddresses] = useState([]);
//     const [selectedAddress, setSelectedAddress] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [orderPending, setOrderPending] = useState(false);

//     useEffect(() => {
//         if (!token) { navigate('/login'); return; }
//         fetchAddresses();
//     }, [token]);

//     const fetchAddresses = async () => {
//         try {
//             const res = await getAddress(token);
//             const data = res.data?.items || res.data?.data || res.data || [];
//             setAddresses(Array.isArray(data) ? data : []);
//         } catch (err) {
//             toast.error("Could not load addresses");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSaveNewAddress = async (formData) => {
//         setIsSaving(true);
//         try {
//             await saveAddress(token, formData);
//             toast.success("Address added");
//             setIsModalOpen(false);
//             fetchAddresses(); 
//         } catch (err) {
//             toast.error("Failed to save address");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handlePlaceOrder = async () => {
//     if (!selectedAddress || !paymentMethod) return toast.warning("Selection incomplete");
//     setOrderPending(true);

//     // 1. Prepare items to match the required JSON structure
//     const items = checkoutItems.map(item => ({
//         productId: item.id || item._id,
//         quantity: item.quantity
//     }));

//     // 2. Prepare the order body to match your JSON sample exactly
//     const orderData = {
//         items: items,
//         address: {
//             full_name: selectedAddress.full_name,
//             street_address: selectedAddress.street_address,
//             apartment: selectedAddress.apartment,
//             city: selectedAddress.city,
//             zip: selectedAddress.zip,
//             phone: selectedAddress.phone
//         }
//         // Note: If your backend needs paymentMethod or totalAmount, 
//         // add them here, but your sample only showed items and address.
//     };

//     try {
//         const res = await createOrder(token, orderData);
//         toast.success("Order Placed!");
//         navigate('/', { state: { orderId: res.data?._id || res.data?.id } });
//     } catch (err) {
//         toast.error(err.response?.data?.message || "Order failed");
//     } finally {
//         setOrderPending(false);
//     }
// };

//     // const handlePlaceOrder = async () => {
//     //     if (!selectedAddress || !paymentMethod) return toast.warning("Selection incomplete");
//     //     setOrderPending(true);

//     //     // Map items to include the product name as requested
//     //     const itemsWithNames = checkoutItems.map(item => ({
//     //         productId: item.id || item._id,
//     //         name: item.name, // Added product name
//     //         quantity: item.quantity,
//     //         price: item.price
//     //     }));

//     //     const orderData = {
//     //         userId: user?.id || user?._id,
//     //         totalAmount,
//     //         paymentStatus: 'PENDING',
//     //         orderStatus: 'CREATED',
//     //         address: `${selectedAddress.street_address}, ${selectedAddress.apartment}, ${selectedAddress.city} - ${selectedAddress.zip}`,
//     //         contact: { phone: selectedAddress.phone, email: user?.email },
//     //         payment_method: paymentMethod,
//     //         items: itemsWithNames // Included names in the items array
//     //     };

//     //     try {
//     //         const res = await createOrder(token, orderData);
//     //         toast.success("Order Placed!");
//     //         navigate('/order-success', { state: { orderId: res.data?._id || res.data?.id } });
//     //     } catch (err) {
//     //         toast.error(err.response?.data?.message || "Order failed");
//     //     } finally {
//     //         setOrderPending(false);
//     //     }
//     // };

//     if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

//     return (
//         <div className="min-h-screen bg-white text-black p-4 md:p-12">
//             <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewAddress} isSaving={isSaving} />

//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
//                 <div className="lg:col-span-2 space-y-12">
//                     <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase mb-4"><ArrowLeft size={16}/> Back</button>

//                     <section>
//                         <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
//                             <h2 className="text-sm font-black uppercase tracking-widest">1. Delivery Address</h2>
//                             <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1 text-[10px] font-bold uppercase border border-black px-2 py-1 transition-all hover:bg-black hover:text-white">
//                                 <Plus size={14}/> Add New
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                             {addresses.map((addr) => (
//                                 <div key={addr._id || addr.id} onClick={() => setSelectedAddress(addr)} className={`p-5 border-2 cursor-pointer relative transition-all ${selectedAddress?._id === addr._id ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-60'}`}>
//                                     {selectedAddress?._id === addr._id && <CheckCircle2 size={16} className="absolute top-3 right-3" />}
//                                     <p className="text-xs font-black uppercase mb-2">{addr.full_name}</p>
//                                     <p className="text-[11px] text-zinc-500 uppercase font-medium leading-relaxed">
//                                         {addr.street_address}, {addr.apartment}<br/>{addr.city}, {addr.zip}<br/>PH: {addr.phone}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>

//                     <section>
//                         <h2 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">2. Payment Method</h2>
//                         <div className="space-y-3">
//                             {['Credit or Debit card', 'Net Banking', 'Scan and Pay with UPI', 'Cash on Delivery'].map((m) => (
//                                 <label key={m} className={`flex items-center p-4 border-2 transition-all cursor-pointer ${paymentMethod === m ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-60'}`}>
//                                     <input type="radio" className="hidden" onChange={() => setPaymentMethod(m)} checked={paymentMethod === m} />
//                                     <span className="text-xs font-black uppercase tracking-tight">{m}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </section>
//                 </div>

//                 <div className="lg:col-span-1">
//                     <div className="border-2 border-black p-8 sticky top-12">
//                         <h3 className="text-xs font-black uppercase mb-8 tracking-widest text-center border-b border-zinc-100 pb-4">Checkout Summary</h3>
//                         <div className="space-y-4 mb-8">
//                             {checkoutItems.map((item, idx) => (
//                                 <div key={idx} className="flex justify-between items-start gap-4 text-xs">
//                                     <span className="font-bold uppercase truncate flex-1">{item.name} (x{item.quantity})</span>
//                                     <span className="font-black">Rs. {item.price * item.quantity}</span>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="border-t-2 border-black pt-6 space-y-2">
//                             <div className="flex justify-between text-xs font-bold uppercase"><span>Subtotal</span><span>Rs. {totalAmount}</span></div>
//                             <div className="flex justify-between text-xs font-bold uppercase text-green-600"><span>Delivery</span><span>FREE</span></div>
//                             <div className="flex justify-between text-xl font-black uppercase pt-4"><span>Total</span><span>Rs. {totalAmount}</span></div>
//                         </div>
//                         <button onClick={handlePlaceOrder} disabled={orderPending || !selectedAddress || !paymentMethod} className={`w-full py-5 mt-8 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${orderPending || !selectedAddress || !paymentMethod ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800'}`}>
//                             {orderPending ? <Loader2 className="animate-spin" /> : "Place Order Now"}
//                         </button>
//                         <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-black uppercase text-zinc-400 tracking-tighter">
//                             <ShieldCheck size={12} /> Secure Checkout
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;