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
// import { websiteName } from '../../utils/Constants.jsx';
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
    getReview, 
    deleteReview 
} from '../../utils/service/apiService.js';

// UI Components
import ProductDetails from './ProdDetail.jsx';
import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import FeatureSection from '../../components/ui/FeatureSection.jsx';
import ProductCarousel from '../../components/ui/ProductCarousel.jsx';
import AnnouncementBar from "../../components/ui/AnnouncementBar.jsx";
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer.jsx';
import ProductReview from '../../components/ui/ProductReview.jsx';
import { websiteName } from '../../utils/Constants.jsx';

const InfoProd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // --- Redux State ---
    const token = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);

    // --- Component States ---
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState(null);
    const [userReview, setUserReview] = useState(null);

    // --- 1. Fetch User-Specific Review ---
    const fetchAndFilterUserReview = async () => {
        if (!token || !user) return;

        try {
            // Use your service to get product reviews
            const res = await getReview(token, id);
            
            // Navigate common response structures (res.data or res.data.reviews)
            const allReviews = res.data?.data || res.data?.reviews || res.data || [];
            
            if (Array.isArray(allReviews)) {
                // Filter to find the one review that matches the logged-in user's ID
                const foundReview = allReviews.find(rev => {
                    const reviewOwnerId = rev.userId || rev.user?._id || rev.user?.id || rev.user;
                    const loggedInId = user._id || user.id;
                    return String(reviewOwnerId) === String(loggedInId);
                });
                
                setUserReview(foundReview || null);
            }
        } catch (err) {
            console.error("Error fetching review data:", err);
            setUserReview(null);
        }
    };

    // --- 2. Delete Review Logic ---
    const handleDeleteReview = async () => {
        if (!window.confirm("Permanently remove your review?")) return;

        try {
            await deleteReview(token, id);
            toast.success("Review deleted");
            setUserReview(null); // Instantly updates UI
        } catch (err) {
            toast.error("Failed to delete review");
        }
    };

    // --- 3. Initial Load ---
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                // Load Product Details
                const prodRes = await viewProduct(id);
                setProduct(prodRes.data.product || prodRes.data);
                
                if ((prodRes.data.product || prodRes.data)?.variants?.length > 0) {
                    setSelectedSize((prodRes.data.product || prodRes.data).variants[0]);
                }

                // Load Related Products
                const allRes = await viewAllProducts();
                setRelatedProducts((allRes.data.products || allRes.data).filter(p => p._id !== id));

                // Load User Review
                await fetchAndFilterUserReview();

            } catch (err) {
                console.error("Initialization error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
        window.scrollTo(0, 0);
    }, [id, token, user]);

    if (loading) return <ProductInfoShimmer />;
    if (!product) return <div className="text-center py-20 font-bold">Product not found.</div>;

    const productTabs = [
        { 
            id: 'description', 
            label: 'Product Description', 
            content: <div className="p-4 text-gray-600">{product.description}</div> 
        },
        { 
            id: 'shipping', 
            label: 'Shipping & Return', 
            content: <div className="p-4 text-gray-600">Standard 3-5 day delivery.</div> 
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className='flex justify-center py-6'>
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.name }]} />
            </div>

            <ProductDetails 
                product={product} 
                selectedVariant={selectedSize} 
                setSelectedVariant={setSelectedSize} 
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                 <Tabs tabs={productTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
             
            <AnnouncementBar />

            <ProductCarousel title="You Might Also Like" products={relatedProducts} />  

            {/* --- USER REVIEW SECTION --- */}
            <div className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Feedback</h2>
                        {userReview && <p className="text-xs text-green-600 font-medium">Verified Reviewer</p>}
                    </div>
                    
                    {/* Hide button if userReview exists to prevent "Duplicate Entry" errors */}
                    {!userReview && (
                        <Link to={`/write-review/${id}`}>
                            <button className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                                Write a review
                            </button>
                        </Link>
                    )}
                </div>

                {userReview ? (
                    <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-100 relative">
                        {/* Passing the filtered userReview as an array [userReview] 
                            so the ProductReview component can map over it.
                        */}
                        <ProductReview data={[userReview]} />
                        
                        <div className="mt-8 flex justify-end pt-4 border-t border-gray-200">
                            <button 
                                onClick={handleDeleteReview}
                                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                ✕ Delete My Review
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400">You haven't shared your thoughts on this product yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoProd;