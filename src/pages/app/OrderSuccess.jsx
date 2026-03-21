import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 md:p-6 font-sans antialiased text-black">
            <div className="w-full max-w-lg flex flex-col items-center justify-center border border-gray-100 shadow-2xl rounded-xl bg-white p-10 md:p-14 text-center">
                <CheckCircle2 size={56} strokeWidth={1} className="mb-6 text-black" />

                <h1 className="text-2xl font-light tracking-[0.1em] uppercase mb-3">
                    Payment Successful
                </h1>

                <p className="text-sm text-gray-700 font-light mb-10 max-w-sm">
                    Your order has been confirmed and is now being processed. We will email you the tracking details shortly.
                </p>

                <button
                    onClick={() => navigate("/profile/your-order")}
                    className="group flex items-center justify-center gap-3 w-full py-3.5 bg-black text-white hover:bg-zinc-900 transition-all rounded"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        View Orders
                    </span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;