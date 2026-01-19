import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, Upload, X, Loader2 } from 'lucide-react';
import { addReview } from '../../utils/service/apiService';
import { toast } from 'react-toastify';

const WriteReview = () => {
    // Falls back to 'id' if 'productId' isn't found in params
    const params = useParams();
    const productId = params.productId || params.id; 
    
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth?.token);

    // Form States
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Please login to submit a review");
            return navigate('/login');
        }

        if (rating === 0) {
            toast.warn("Please select a star rating");
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading("Submitting your review...");

        try {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('rating', rating);
            formData.append('review', comment); // 'review' key from your apiService
            
            if (image) {
                formData.append('images', image); // 'images' key from your apiService
            }

            const response = await addReview(token, formData);

            if (response.data?.success || response.status === 200 || response.status === 201) {
                setIsSubmitted(true);
                toast.update(loadingToast, { 
                    render: "Review submitted!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                setTimeout(() => navigate('/'), 2500);
            }
        } catch (error) {
            toast.update(loadingToast, { 
                render: error.response?.data?.message || "Failed to submit review", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto mt-20 p-10 text-center bg-white border border-gray-100 rounded-3xl shadow-xl">
                <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star fill="currentColor" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Thank you!</h2>
                <p className="text-gray-500 mt-2">Redirecting you back to your orders...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8 font-sans">
            <h1 className="text-2xl font-bold mb-1 text-gray-900">Create Review</h1>
            <p className="text-sm text-gray-500 mb-8">Product ID: <span className="font-bold text-black">{productId}</span></p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 border border-gray-100 rounded-2xl shadow-sm">
                
                {/* Previous Style Star Selection */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Overall rating</h3>
                    <div className="flex gap-1">
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
                                        ? "fill-[#F7CA00] text-[#F7CA00]" 
                                        : "text-gray-300"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-50" />

                <div>
                    <h3 className="font-bold text-lg mb-2">Add a written review</h3>
                    <textarea
                        className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                        placeholder="Write your comments here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-3">Add a photo</h3>
                    <div className="flex items-center gap-4">
                        {!previewUrl ? (
                            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <Upload size={20} />
                                <span className="text-sm font-medium">Choose File</span>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                        ) : (
                            <div className="relative">
                                <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                                <button 
                                    onClick={() => { setImage(null); setPreviewUrl(null); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-10 py-3 bg-black text-white rounded-full font-bold transition flex items-center gap-2 ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                        }`}
                    >
                        {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : "Submit Review"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;