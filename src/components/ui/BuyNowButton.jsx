import { ChevronRight } from 'lucide-react';

export default function BuyNowButton() {
    return (
        /* Removed px-4 and max-w-2xl to allow full width */
        <div className="w-full py-4"> 
            <button className="w-full bg-black text-white rounded-2xl py-3 px-4 md:px-8 relative overflow-hidden group hover:bg-gray-900 transition-colors duration-300 min-h-[60px]">

                {/* Content Container */}
                <div className="flex items-center justify-between">
                    {/* Left Side - BUY NOW Text & Icons */}
                    <div className="flex items-center gap-3 md:gap-6 flex-1">
                        <span className="text-lg md:text-xl font-bold italic tracking-wide">
                            BUY NOW
                        </span>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-2">
                            {/* Google Pay */}
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                                <img className="w-full h-full object-cover" src="https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk" alt="GPay" />
                            </div>

                            {/* Phonepe */}
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                                <img className="w-full h-full object-cover" src="https://i.pinimg.com/736x/2a/cf/b6/2acfb6fb41f7fcb82c3230afdecff714.jpg" alt="PhonePe" />
                            </div>

                            {/* Paytm */}
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                                <img className="w-full h-full object-cover" src="https://yt3.googleusercontent.com/tG2jdjkS_OMG1AjdSobofgDMoQkoIyo40ZWXiFAaqwDnzUjLT4gK94Dc6ZcYDUVDNdvzhQlbLNs=s900-c-k-c0x00ffffff-no-rj" alt="Paytm" />
                            </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>

                {/* Right Side - Powered By (Positioned relative to full-width button) */}
                <div className="absolute bottom-1 right-4 text-[8px] md:text-[10px] text-gray-400">
                    Powered By <span className="text-white italic">JBH (Zeesu)</span>
                </div>
            </button>
        </div>
    );
}