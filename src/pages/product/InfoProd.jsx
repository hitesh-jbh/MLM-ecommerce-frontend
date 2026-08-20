import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from '../../components/partials/footer/footer.jsx';


// API Services
import { 
    viewProduct, 
    viewAllProducts, 
    productReview, 
    deleteReview 
} from '../../utils/service/apiService';

// UI Components
import ProductDetails from './ProdDetail.jsx';
import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
import ProductCarousel from '../../components/ui/ProductCarousel.jsx';
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer.jsx';
import ProductReview from '../../components/ui/ProductReview.jsx';

const InfoProd = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    
    // Review States
    const [setAllReviews] = useState([]); 
    const [userReview, setUserReview] = useState(null);

    const fetchReviewsData = async () => {
        try {
            const res = await productReview(token, id);
            const reviews = res.data?.data || res.data?.reviews || res.data || [];
            setAllReviews(reviews);

            if (user && Array.isArray(reviews)) {
                const foundReview = reviews.find(rev => {
                    const reviewOwnerId = rev.userId || rev.user?._id || rev.user?.id || rev.user;
                    const loggedInId = user._id || user.id;
                    return String(reviewOwnerId) === String(loggedInId);
                });
                setUserReview(foundReview || null);
            }
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    const handleDeleteReview = async () => {
        if (!window.confirm("Permanently remove your review?")) return;
        try {
            await deleteReview(token, id);
            toast.success("Review deleted");
            setUserReview(null);
            fetchReviewsData(); 
        } catch (err) {
            toast.error(err, "Failed to delete review");
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const prodRes = await viewProduct(id);
                const currentProduct = prodRes.data.product || prodRes.data;
                setProduct(currentProduct);
                
                if (currentProduct?.variants?.length > 0) {
                    setSelectedSize(currentProduct.variants[0]);
                }

                const allRes = await viewAllProducts();
                setRelatedProducts((allRes.data.products || allRes.data).filter(p => p._id !== id));

                await fetchReviewsData();
            } catch (err) {
                console.error("Init error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
        window.scrollTo(0, 0);
    }, [id, token, user]);

    if (loading) return <ProductInfoShimmer />;
    if (!product) return <div className="text-center py-20 font-serif text-xl font-bold text-red-500">Product not found.</div>;

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Header & Breadcrumb */}
            <div className='flex justify-center py-6 border-b border-gray-50'>
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.name }]} />
            </div>

            {/* 2. Main Product Section */}
            <ProductDetails 
                product={product} 
                selectedVariant={selectedSize} 
                setSelectedVariant={setSelectedSize} 
            />

            {/* 3. Related Products (With extra spacing for clean look) */}
            <div className="py-12 md:py-16 bg-gray-50/30">
                <ProductCarousel title="You Might Also Like" products={relatedProducts} />  
            </div>

            {/* 4. USER SPECIFIC ACTIONS */}
            <div className="max-w-5xl mx-auto px-4 pt-16 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-dirora-dark tracking-tight">Your Experience</h2>
                    {!userReview && token && (
                        <Link to={`/write-review/${id}`}>
                            <button className="bg-[#9333ea] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#7e22ce] shadow-md hover:shadow-lg hover:shadow-purple-200 transition-all">
                                Write a review
                            </button>
                        </Link>
                    )}
                </div>

                {userReview ? (
                    <div className="bg-[#f8f5ff] p-6 rounded-3xl border border-purple-100 shadow-sm">
                        <p className="text-[10px] text-dirora-purple font-black uppercase mb-4 tracking-widest">Your Posted Review</p>
                        <ProductReview data={[userReview]} />
                        <div className="mt-6 flex justify-end">
                            <button onClick={handleDeleteReview} className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest transition-colors">
                                Remove Review
                            </button>
                        </div>
                    </div>
                ) : !token ? (
                    <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                        <p className="text-sm text-gray-500 font-medium">Please <Link to="/login" className="text-dirora-purple font-black hover:underline">Login</Link> to share your feedback.</p>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-[#f8f5ff] rounded-3xl border border-dashed border-purple-200">
                        <p className="text-sm text-dirora-purple font-bold tracking-wide">Help others by sharing your thoughts on this item!</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default InfoProd;