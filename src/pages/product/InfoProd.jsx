// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import ProductDetails from './ProdDetail.jsx';
// import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
// import Tabs from '../../components/ui/Tabs.jsx';
// import FeatureSection from '../../components/ui/FeatureSection.jsx';
// import ProductCarousel from '../../components/ui/ProductCarousel.jsx';
// import AnnouncementBar from "../../components/ui/AnnouncementBar.jsx";
// import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer.jsx';
// import HappyCustomersCards from "../../components/ui/HappyCustomersCards.jsx";

// import { useDispatch } from 'react-redux';
// import { viewProduct, viewAllProducts } from '../../utils/service/apiService.js';
// import { websiteName } from '../../utils/constants.jsx';
// import ProductReview from '../../components/ui/ProductReview.jsx';

// const InfoProd = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     // --- States ---
//     const [product, setProduct] = useState(null);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showStickyBar, setShowStickyBar] = useState(false);
//     const [activeTab, setActiveTab] = useState('description');
//     const [selectedSize, setSelectedSize] = useState(null);
//     console.log(product)
//     const [reviews, setReviews] = useState([]);  // product review list

//     // --- Fetch Data ---
//     useEffect(() => {
//     fetch(`/api/review/${id}`)
//         .then(res => res.json())
//         .then(json => setReviews(json));
//     }, []);

//     useEffect(() => {
//         const fetchPageData = async () => {
//             setLoading(true);
//             try {
//                 // 1. Fetch current product
//                 const res = await viewProduct(id);
//                 const currentProd = res.data.product || res.data;
//                 setProduct(currentProd);
                
//                 // Set default size if variants exist
//                 if (currentProd?.variants?.length > 0) {
//                     setSelectedSize(currentProd.variants[0]);
//                 }

//                 // 2. Fetch all products for the "Related" carousel
//                 const allRes = await viewAllProducts();
//                 const allProds = allRes.data.products || allRes.data;
//                 // Filter out the current product from suggestions
//                 setRelatedProducts(allProds.filter(p => p._id !== id));

//             } catch (err) {
//                 console.error("Error loading page:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPageData();
//         window.scrollTo(0, 0);

//         const handleScroll = () => setShowStickyBar(window.scrollY > 600);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [id]);

//     // --- Handlers ---
//     const handleAddToCart = () => {
//         if (!selectedSize) {
//             alert("Please select a size first!");
//             return;
//         }
//         // Add your Redux dispatch logic here
//         alert(`Added to cart: ${product.name}`);
//     };

//     // --- Render Logic ---
//     if (loading) return <ProductInfoShimmer />;
    
//     if (!product) return (
//         <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//             <h2 className="text-2xl font-bold">Product Not Found</h2>
//             <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded-lg">
//                 Return to Shop
//             </button>
//         </div>
//     );

//     const featureData = [
//         { icon: "heroicons:shield-check", head: "Premium Quality", desc: "Crafted from 100% long-staple cotton." },
//         { icon: "heroicons:truck", head: "Fast Shipping", desc: "Pan-India delivery within 3-5 days." },
//         { icon: "heroicons:arrow-path", head: "Easy Returns", desc: "7-day hassle-free return policy." }
//     ];

//     const productTabs = [
//         { 
//             id: 'description', 
//             label: 'Product Description', 
//             content: (
//                 <div className="p-4 space-y-4">
//                     <p>{product.description}</p>
//                 </div>
//             ) 
//         },
//         { 
//             id: 'shipping', 
//             label: 'Shipping & Return', 
//             content: (
//                 <div className="p-4">
//                     <p>Shipping cost is calculated at checkout. Delivery within 3-7 business days.</p>
//                 </div>
//             ) 
//         }
//     ];

//     return (
//         <div className="bg-white min-h-screen">
//             <div className='flex justify-center py-8'>
//                 <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.name }]} />
//             </div>

//             <ProductDetails 
//                 product={product} 
//                 selectedVariant={selectedSize} 
//                 setSelectedVariant={setSelectedSize} 
//             />

//             <div className="max-w-7xl mx-auto px-4 py-12">
//                  <Tabs tabs={productTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
//             </div>
             
//             <AnnouncementBar />

//             <section className="w-full py-16 bg-gray-50">
//                 <div className="max-w-[1440px] mx-auto px-6">
//                     <h2 className="text-center text-3xl font-light mb-12 uppercase tracking-widest">Why {websiteName}?</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {featureData.map((item, index) => (
//                             <FeatureSection 
//                                 key={index}
//                                 iconName={item.icon}
//                                 title={item.head}
//                                 description={item.desc}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Real data from API */}
//             <ProductCarousel title="You Might Also Like" products={relatedProducts} />  

//             <div>
//                 <Link to={`/write-review/${id}`}>
//                     <button className="w-full py-2.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-bold text-gray-700 transition-colors">
//                         Write a product review
//                     </button>
//                 </Link>
//             </div>   

//             <div>
//                 <ProductReview data={reviews} />
//             </div>       
            
//             {/* <ProductReview data={reviews} /> */}
//         </div>
//     );
// };

// export default InfoProd;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// API Services
import { 
    viewProduct, 
    viewAllProducts, 
    productReview, 
    deleteReview 
} from '../../utils/service/apiService.js';

// UI Components
import ProductDetails from './ProdDetail.jsx';
import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import ProductCarousel from '../../components/ui/ProductCarousel.jsx';
import AnnouncementBar from "../../components/ui/AnnouncementBar.jsx";
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer.jsx';
import ProductReview from '../../components/ui/ProductReview.jsx';

const InfoProd = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState(null);
    
    // Review States
    const [allReviews, setAllReviews] = useState([]); 
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
            toast.error("Failed to delete review");
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
    if (!product) return <div className="text-center py-20 font-bold text-red-500">Product not found.</div>;

    const productTabs = [
        { 
            id: 'description', 
            label: 'Product Description', 
            content: <div className="p-4 text-gray-600 leading-relaxed">{product.description}</div> 
        },
        { 
            id: 'shipping', 
            label: 'Shipping & Return', 
            content: <div className="p-4 text-gray-600">Free shipping on orders over $100. Returns accepted within 30 days.</div> 
        }
    ];

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

            {/* 3. Description Tabs */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                 <Tabs tabs={productTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
             
            <AnnouncementBar />

            {/* 4. Related Products */}
            <ProductCarousel title="You Might Also Like" products={relatedProducts} />  

            {/* 5. USER SPECIFIC ACTIONS (Write or Delete) */}
            {/* <div className="max-w-4xl mx-auto px-4 pt-16 pb-8 border-t border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Your Experience</h2>
                    {!userReview && token && (
                        <Link to={`/write-review/${id}`}>
                            <button className="bg-black text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                                Write a review
                            </button>
                        </Link>
                    )}
                </div>

                {userReview ? (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p className="text-[10px] text-green-600 font-bold uppercase mb-4 tracking-widest">Your Posted Review</p>
                        <ProductReview data={[userReview]} />
                        <div className="mt-6 flex justify-end">
                            <button onClick={handleDeleteReview} className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-tighter">
                                Remove Review
                            </button>
                        </div>
                    </div>
                ) : !token ? (
                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-sm text-gray-500">Please <Link to="/login" className="text-black font-bold underline">Login</Link> to share your feedback.</p>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-blue-50/30 rounded-2xl border border-dashed border-blue-200">
                        <p className="text-sm text-blue-600 font-medium italic">Help others by sharing your thoughts on this item!</p>
                    </div>
                )}
            </div> */}

            {/* 6. ALL PRODUCT REVIEWS (The Last Component) */}
            <section className="max-w-5xl mx-auto px-4 py-10 border-t border-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 gap-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Customer Feedback</h2>
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                            {allReviews.length} Verified Reviews
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-gray-100 mx-4 hidden md:block"></div>
                </div>

                {allReviews.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {/* Wrapped in a smaller container with minimal padding 
                        to prevent the "large empty box" look 
                        */}
                        <div className="bg-white rounded-xl p-1 md:p-4">
                            <ProductReview data={allReviews} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-sm text-gray-400 italic">No reviews yet for this product.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default InfoProd;