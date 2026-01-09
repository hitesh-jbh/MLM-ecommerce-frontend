import React from 'react';
import { Check, X } from 'lucide-react'; // Added X for cancelled state

const StepBar = ({ status }) => {
    const steps = [
        { key: '1', label: 'Ordered' },
        { key: '2', label: 'Packed' },
        { key: '3', label: 'Shipped' },
        { key: '4', label: 'Out for delivery' },
        { key: '5', label: 'Delivered' },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === String(status));
    const isCancelled = status === "0";

    return (
        <div className="w-full py-4">
            <div className="relative flex justify-between">
                {/* Background Line */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-0"></div>
                
                {/* Active Progress Line (Hidden if cancelled) */}
                {!isCancelled && currentStepIndex !== -1 && (
                    <div 
                        className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-700 ease-in-out -z-0"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    ></div>
                )}

                {steps.map((step, index) => {
                    const isCompleted = !isCancelled && index < currentStepIndex;
                    const isCurrent = !isCancelled && index === currentStepIndex;

                    // Handle styling for different states
                    let circleClasses = "bg-white border-gray-200 text-gray-400";
                    if (isCancelled) {
                        circleClasses = "bg-red-50 border-red-200 text-red-400";
                    } else if (isCompleted || isCurrent) {
                        circleClasses = "bg-green-500 border-green-500 text-white";
                    }

                    return (
                        <div key={step.key} className="relative z-10 flex flex-col items-center flex-1">
                            {/* Circle */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${circleClasses}`}>
                                {isCancelled ? (
                                    <X size={20} />
                                ) : isCompleted ? (
                                    <Check size={20} strokeWidth={3} />
                                ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                )}
                            </div>

                            {/* Label */}
                            <p className={`mt-3 text-xs md:text-sm font-bold text-center ${
                                isCurrent ? 'text-green-600' : isCancelled ? 'text-red-400' : 'text-gray-500'
                            }`}>
                                {step.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepBar;