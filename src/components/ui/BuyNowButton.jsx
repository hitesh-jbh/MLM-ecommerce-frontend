import { ChevronRight } from 'lucide-react';

export default function BuyNowButton() {
    return (
        /* Reduced vertical padding to keep the layout tight */
        <div className="w-full py-2"> 
            <button className="w-full bg-black text-white rounded-xl py-2.5 px-4 md:px-6 relative overflow-hidden group hover:bg-[#111] transition-all duration-300 min-h-[20px] md:min-h-[30px] shadow-sm active:scale-[0.98]">

                {/* Content Container */}
                <div className="flex items-center justify-between gap-3">
                    
                    {/* Left Side Group */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                            Buy Now
                        </span>

                        {/* Divider Line - Adds a premium look */}
                        <div className="h-6 w-[1px] bg-gray-800 hidden sm:block"></div>

                        {/* Payment Icons - Clean & Compact */}
                        <div className="flex items-center -space-x-1.5 md:space-x-1.5">
                            {/* GPay */}
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" />
                            </div>

                            {/* Apple Pay */}
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="PhonePe" />
                            </div>

                            {/* Visa */}
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 ring-2 ring-black overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-contain" src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Paytm" />
                            </div>
                        </div>
                    </div>

                    {/* Arrow Group */}
                    <div className="flex items-center gap-1">
                        <span className="hidden md:block text-[10px] text-gray-500 font-medium uppercase tracking-widest">Secure</span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>

                {/* Powered By - Subtle & Professional */}
                <div className="absolute bottom-0.5 right-4 text-[6px] md:text-[8px] text-gray-600 tracking-tighter">
                    Powered by <span className="text-gray-400 font-medium">JBH[Zeeshu]</span>
                </div>
            </button>
        </div>
    );
}