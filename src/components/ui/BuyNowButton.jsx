import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BuyNowButton({ product, quantity }) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const handlePlaceOrder = () => {
        if (!token) return navigate("/login");
        setIsPending(true);

        const checkoutData = {
            checkoutItems: [{
                productId: product.id || product._id,
                name: product.name,
                price: product.price,
                quantity: quantity || 1,
                thumbnail: product.thumbnail_url || product.images?.[0]
            }],
            totalAmount: Number(product.price) * (quantity || 1),
            source: "DIRECT" // Flag for single product purchase
        };

        navigate("/checkout", { state: checkoutData });
        setIsPending(false);
    };

    return (
        <button onClick={handlePlaceOrder} disabled={isPending} className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2">
            {isPending ? <Loader2 className="animate-spin" /> : "Buy Now"} <ChevronRight size={18} />
        </button>
    );
}


// import React, { useState } from 'react';
// import { ChevronRight, Loader2, Slash } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function BuyNowButton({ product, quantity }) {
//     const navigate = useNavigate();
//     const [isPending, setIsPending] = useState(false);
//     const { token } = useSelector((state) => state.auth);

//     if (!product) return null;
//     const isOutOfStock = (product?.stock ?? 0) <= 0;

//     const handlePlaceOrder = () => {
//         if (!token) {
//             toast.warning("Please login to continue");
//             return navigate("/login");
//         }

//         setIsPending(true);

//         // Map product data to a generic checkout format
//         const checkoutData = {
//             checkoutItems: [{
//                 id: product.id || product._id,
//                 name: product.name,
//                 price: product.price,
//                 quantity: quantity || 1,
//                 image: product.thumbnail_url || product.images?.[0]
//             }],
//             totalAmount: product.price * (quantity || 1)
//         };

//         // Navigate to the generic checkout page
//         navigate("/checkout", { state: checkoutData });
//         setIsPending(false);
//     };

//     return (
//         <div className="w-full"> 
//             <button 
//                 onClick={handlePlaceOrder} 
//                 disabled={isPending || isOutOfStock}
//                 className={`w-full rounded-xl py-2.5 px-4 md:px-6 relative overflow-hidden group transition-all duration-300 min-h-[50px] shadow-sm active:scale-[0.98] 
//                 ${isOutOfStock 
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300' 
//                     : 'bg-black text-white hover:bg-[#111]'
//                 } ${isPending ? 'opacity-80' : ''}`}
//             >
//                 <div className={`flex items-center justify-between gap-3 ${isPending ? 'opacity-0' : 'opacity-100'}`}>
//                     <div className="flex items-center gap-3 md:gap-5">
//                         <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase whitespace-nowrap">
//                             {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
//                         </span>
//                         {!isOutOfStock && (
//                             <>
//                                 <div className="h-6 w-[1px] bg-gray-800 hidden sm:block"></div>
//                                 <div className="flex items-center -space-x-1.5 md:space-x-1.5">
//                                     <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" />
//                                     <PaymentIcon src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                     <div className="flex items-center gap-1">
//                         {isOutOfStock ? (
//                             <Slash className="w-4 h-4 text-gray-400" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
//                         )}
//                     </div>
//                 </div>
//                 {isPending && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <Loader2 className="w-5 h-5 animate-spin text-white" />
//                     </div>
//                 )}
//             </button>
//         </div>
//     );
// }

// function PaymentIcon({ src, alt }) {
//     return (
//         <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-1 ring-zinc-200 overflow-hidden flex-shrink-0">
//             <img className="w-full h-full object-contain" src={src} alt={alt} />
//         </div>
//     );
// }
