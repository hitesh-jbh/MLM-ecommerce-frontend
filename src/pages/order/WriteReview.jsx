import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const WriteReview = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    // Form States
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            alert("Please select a star rating");
            return;
        }

        const newReview = {
            orderId,
            rating,
            comment,
            date: new Date().toLocaleDateString(),
        };

        console.log("Review Stored:", newReview);

        setIsSubmitted(true);

        setTimeout(() => {
            navigate('/your-order');
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 text-center bg-white border rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star fill="currentColor" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thank you!</h2>
                <p className="text-gray-600 mt-2">Your review has been submitted successfully.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold mb-2">Product Review</h1>
            <p className="text-gray-600 mb-8">Order ID: <span className="text-black font-medium">{orderId}</span></p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 border rounded-xl shadow-sm">
                
                {/* Star Selection Section */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Overall rating</h3>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="transition-transform active:scale-90"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <Star
                                    size={36}
                                    strokeWidth={1.5}
                                    className={`cursor-pointer transition-colors ${
                                        (hover || rating) >= star 
                                        ? "fill-black-400 text-black" 
                                        : "text-gray-300"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="mt-2 text-sm font-medium text-black">
                            {rating} out of 5 stars
                        </p>
                    )}
                </div>

                <hr className="border-gray-100" />

                {/* Comment Box Section */}
                <div>
                    <h3 className="font-bold text-lg mb-1">Add a written review</h3>
                    <p className="text-sm text-gray-500 mb-3">What did you like or dislike? What was the product used for?</p>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-4 h-34 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                        placeholder="Write your comments here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-8 py-2 bg-black border border-black text-white rounded-full  font-medium transition shadow-sm"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;