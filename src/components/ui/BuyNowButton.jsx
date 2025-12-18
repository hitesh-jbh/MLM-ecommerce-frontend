import { ChevronRight } from 'lucide-react';

export default function BuyNowButton() {
    return (
        <div className="w-full flex justify-center py-8 px-4">
            <button className="w-full max-w-2xl bg-black text-white rounded-2xl py-1 md:py-1 px-1 md:px-8 relative overflow-hidden group hover:bg-gray-900 transition-colors duration-300">

                {/* Content Container */}
                <div className="flex items-center justify-between">
                    {/* Left Side - BUY NOW Text */}
                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <span className="text-sm md:text-1xl font-cursive tracking-wide">
                            BUY NOW
                        </span>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-1 md:gap-2 w-[20%]">
                            {/* Google Pay */}
                            <div className="w-8 h-8 md:w-10 md:h-1 bg-white rounded-full flex items-center justify-center shadow-md">
                                <img className="rounded-full" src="https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk" />
                            </div>

                            {/* Phonepe */}
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br rounded-full flex items-center justify-center shadow-md">
                                <img className="rounded-full" src="https://i.pinimg.com/736x/2a/cf/b6/2acfb6fb41f7fcb82c3230afdecff714.jpg" />
                            </div>

                            {/* Paytm */}
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md">
                                <img className="rounded-full" src="https://yt3.googleusercontent.com/tG2jdjkS_OMG1AjdSobofgDMoQkoIyo40ZWXiFAaqwDnzUjLT4gK94Dc6ZcYDUVDNdvzhQlbLNs=s900-c-k-c0x00ffffff-no-rj" />
                            </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                </div>
                {/* Right Side - Powered By */}
                <div className="absolute bottom-2 right-4 md:bottom-1 md:right-2 text-[10px] md:text-[10px] text-gray-400">
                    Powered By <span className="text-white font-cursive">JBH (Zeesu)</span>
                </div>
            </button>
        </div>
    );
}