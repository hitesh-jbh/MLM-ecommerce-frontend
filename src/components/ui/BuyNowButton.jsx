import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../utils/Slice/orderSlice';
import { toast } from 'react-toastify';

export default function BuyNowButton({ product }) {
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);

    const handlePlaceOrder = async () => {
        setIsPending(true);

        const orderData = {
            items: [product],
            totalPrice: product.price,
            size: product?.variant?.size || "Standard", 
            date: new Date().toLocaleDateString(),
        };

        try {
            // Simulate network latency
            await new Promise(resolve => setTimeout(resolve, 800));
            
            dispatch(placeOrder(orderData));

            // React Toastify Success
            toast.success(`Success! ${product.name} ordered.`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark", // Matches your black button
            });

        } catch (error) {
            toast.error("Order failed. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full py-2"> 
            <button 
                onClick={handlePlaceOrder} 
                disabled={isPending}
                className={`w-full bg-black text-white rounded-xl py-2.5 px-4 md:px-6 relative overflow-hidden group transition-all duration-300 min-h-[50px] shadow-sm active:scale-[0.98] ${
                    isPending ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#111]'
                }`}
            >
                {/* Content Container */}
                <div className={`flex items-center justify-between gap-3 ${isPending ? 'opacity-0' : 'opacity-100'}`}>
                    
                    {/* Left Side Group */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                            Buy Now
                        </span>

                        <div className="h-6 w-[1px] bg-gray-800 hidden sm:block"></div>

                        {/* Payment Icons */}
                        <div className="flex items-center -space-x-1.5 md:space-x-1.5">
                            <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" />
                            <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" />
                            <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                        </div>
                    </div>

                    {/* Arrow Group */}
                    <div className="flex items-center gap-1">
                        <span className="hidden md:block text-[10px] text-gray-500 font-medium uppercase tracking-widest">Secure</span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>

                {/* Loading Spinner Overlay */}
                {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                    </div>
                )}

                {/* Powered By */}
                <div className="absolute bottom-0.5 right-4 text-[6px] md:text-[8px] text-gray-600 tracking-tighter">
                    Powered by <span className="text-gray-400 font-medium">JBH[Zeeshu]</span>
                </div>
            </button>
        </div>
    );
}

// Reusable Icon Component
function PaymentIcon({ src, alt }) {
    return (
        <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
            <img className="w-full h-full object-contain" src={src} alt={alt} />
        </div>
    );
}


// import { ChevronRight } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { placeOrder } from '../../utils/Slice/orderSlice';


// export default function BuyNowButton({ product }) {
//     const dispatch = useDispatch();

//     const handlePlaceOrder = () => {
//         // Construct a clean order object
//         const orderData = {
//             items: [product],
//             totalPrice: product.price,
//             size: product?.variant?.size || "Standard", 
//             date: new Date().toLocaleDateString(),
//         };

//         dispatch(placeOrder(orderData));

//         alert(`Order successful! You just bought the ${product.name}.`);
//     };

//     return (
//         <div className="w-full py-2"> 
//             <button 
//                 onClick={handlePlaceOrder} 
//                 className="w-full bg-black text-white rounded-xl py-2.5 px-4 md:px-6 relative overflow-hidden group hover:bg-[#111] transition-all duration-300 min-h-[50px] shadow-sm active:scale-[0.98]"
//             >
//                 {/* Content Container */}
//                 <div className="flex items-center justify-between gap-3">
                    
//                     {/* Left Side Group */}
//                     <div className="flex items-center gap-3 md:gap-5">
//                         <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase whitespace-nowrap">
//                             Buy Now
//                         </span>

//                         <div className="h-6 w-[1px] bg-gray-800 hidden sm:block"></div>

//                         {/* Payment Icons */}
//                         <div className="flex items-center -space-x-1.5 md:space-x-1.5">
//                             <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
//                                 <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" />
//                             </div>
//                             <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
//                                 <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" />
//                             </div>
//                             <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
//                                 <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Arrow Group */}
//                     <div className="flex items-center gap-1">
//                         <span className="hidden md:block text-[10px] text-gray-500 font-medium uppercase tracking-widest">Secure</span>
//                         <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
//                     </div>
//                 </div>

//                 {/* Powered By */}
//                 <div className="absolute bottom-0.5 right-4 text-[6px] md:text-[8px] text-gray-600 tracking-tighter">
//                     Powered by <span className="text-gray-400 font-medium">JBH[Zeeshu]</span>
//                 </div>
//             </button>
//         </div>
//     );
// }