import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from '../ui/ProdDetail.jsx';
import Breadcrumb from '../ui/BreadCrumb.jsx';
import Tabs from '../ui/Tabs.jsx';
import FeatureSection from '../ui/FeatureSection.jsx';
import ProductCarousel from '../ui/ProductCarousel.jsx';
import AnnouncementBar from "../ui/AnnouncementBar.jsx";
import ProductInfoShimmer from '../ui/ProductInfoShimmer.jsx';
import HappyCustomersCards from "../ui/HappyCustomersCards.jsx";

import { useDispatch } from 'react-redux';
import { viewProduct, viewAllProducts } from '../../utils/Service/apiService.js';

const InfoProd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // --- States ---
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState(null);

    // --- Fetch Data ---
    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            try {
                // 1. Fetch current product
                const res = await viewProduct(id);
                const currentProd = res.data.product || res.data;
                setProduct(currentProd);
                
                // Set default size if variants exist
                if (currentProd?.variants?.length > 0) {
                    setSelectedSize(currentProd.variants[0]);
                }

                // 2. Fetch all products for the "Related" carousel
                const allRes = await viewAllProducts();
                const allProds = allRes.data.products || allRes.data;
                // Filter out the current product from suggestions
                setRelatedProducts(allProds.filter(p => p._id !== id));

            } catch (err) {
                console.error("Error loading page:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
        window.scrollTo(0, 0);

        const handleScroll = () => setShowStickyBar(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    // --- Handlers ---
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }
        // Add your Redux dispatch logic here
        alert(`Added to cart: ${product.name}`);
    };

    // --- Render Logic ---
    if (loading) return <ProductInfoShimmer />;
    
    if (!product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded-lg">
                Return to Shop
            </button>
        </div>
    );

    const featureData = [
        { icon: "heroicons:shield-check", head: "Premium Quality", desc: "Crafted from 100% long-staple cotton." },
        { icon: "heroicons:truck", head: "Fast Shipping", desc: "Pan-India delivery within 3-5 days." },
        { icon: "heroicons:arrow-path", head: "Easy Returns", desc: "7-day hassle-free return policy." }
    ];

    const productTabs = [
        { 
            id: 'description', 
            label: 'Product Description', 
            content: (
                <div className="p-4 space-y-4">
                    <p>{product.description || "Bring elegance and charm to your wardrobe with this premium crafted piece."}</p>
                    <ul className='list-disc ml-6 space-y-1'>
                        <li>Premium breathable fabric</li>
                        <li>Regular fit for day-long comfort</li>
                        <li>High-quality finish and stitching</li>
                    </ul>
                </div>
            ) 
        },
        { 
            id: 'shipping', 
            label: 'Shipping & Return', 
            content: (
                <div className="p-4">
                    <p>Shipping cost is calculated at checkout. Delivery within 3-7 business days.</p>
                </div>
            ) 
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className='flex justify-center py-8'>
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

            <section className="w-full py-16 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h2 className="text-center text-3xl font-light mb-12 uppercase tracking-widest">Why Gentlehaus?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featureData.map((item, index) => (
                            <FeatureSection 
                                key={index}
                                iconName={item.icon}
                                title={item.head}
                                description={item.desc}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Real data from API */}
            <ProductCarousel title="You Might Also Like" products={relatedProducts} />            
            
            <HappyCustomersCards />
        </div>
    );
};

export default InfoProd;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ProductDetails from '../ui/ProdDetail.jsx';
// import Breadcrumb from '../ui/BreadCrumb.jsx';
// import Tabs from '../ui/Tabs.jsx';
// import FeatureSection from '../ui/FeatureSection.jsx';
// import ProductCarousel from '../ui/ProductCarousel.jsx';
// import StickyPurchaseBar from '../ui/CardBottomFixed.jsx';
// import AnnouncementBar from "../ui/AnnouncementBar.jsx";
// import ProductInfoShimmer from '../ui/ProductInfoShimmer.jsx';
// import HappyCustomersCards from "../ui/HappyCustomersCards.jsx"

// import { Product } from '../../utils/Constants.jsx';
// import { useDispatch } from 'react-redux';
// import { placeOrder } from '../../utils/Slice/orderSlice.js';
// import { clearCart } from '../../utils/Slice/cartSlice.js';

//    const DUMMY_PRODUCTS = Product;


// const InfoProd = () => {
//     const { id } = useParams();
    
//     // 1. ALL HOOKS MUST BE AT THE TOP
//     const [loading, setLoading] = useState(true);
//     const [quantity, setQuantity] = useState(1);
//     const [showStickyBar, setShowStickyBar] = useState(false);
//     const [activeTab, setActiveTab] = useState('description');

//     const product = Product.find((p) => p.id === Number(id));

//     // LIFTED STATE: This keeps both components in sync
//     const [selectedSize, setSelectedSize] = useState(product?.variants?.[0] || null);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         setLoading(true);
//         window.scrollTo(0, 0);
        
//         const timer = setTimeout(() => setLoading(false), 1000);
//         const handleScroll = () => setShowStickyBar(window.scrollY > 600);

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             clearTimeout(timer);
//         };
//     }, [id]);

//     if (loading) return <ProductInfoShimmer />;
//     if (!product) return <div className="p-20 text-center text-2xl">Product Not Found</div>;

//     const sizeOptions = product.variants.map(v => ({
//         label: `${v.size} - Rs. ${v.price}`,
//         value: v.size
//     }));

//     const featureData = [
//         { icon: "heroicons:shield-check", head: "Premium Quality", desc: "Crafted from 100% long-staple cotton." },
//         { icon: "heroicons:truck", head: "Fast Shipping", desc: "Pan-India delivery within 3-5 days." },
//         { icon: "heroicons:arrow-path", head: "Easy Returns", desc: "7-day hassle-free return policy." }
//     ];

//     const productTabs = [
//         { id: 'description', label: 'Product Description', content: <div className="p-4">
//             <p className='p-1'>Bring elegance and charm to your wardrobe with this men’s cotton shirt featuring a beautifully detailed floral print. Crafted from soft, breathable cotton, this full sleeve shirt combines comfort with refined style. The warm earthy tones and botanical artwork create a timeless look that’s perfect for both relaxed and semi-formal occasions.</p>

//             <p className='p-1'>Whether paired with chinos or denim, this shirt adds a touch of sophistication inspired by nature.</p>
//             <ul className='list-disc p-2 ml-4' >
//                 <li>Made from 100% breathable cotton</li>
//                 <li>Full sleeve design with button-down closure</li>
//                 <li>Vintage-inspired floral print in warm neutral tones</li>
//                 <li>Regular fit for day-long comfort</li>
//                 <li>Ideal for casual, smart casual, or resort wear</li>
//             </ul>
//         </div> },
//         { id: 'shipping', label: 'Shipping & Return', content: <div className="p-2"><p>Shipping cost is based on weight. Just add products to your cart and use the Shipping Calculator to see the shipping price.</p><br/>
//         <p>We want you to be 100% satisfied with your purchase. Items can be returned or exchanged within 7 days of delivery.</p></div> }
//     ];

//     const handleAddToCart = () => {
//         if (!selectedSize) {
//             alert("Please select a size first!");
//             return;
//         }
//         alert(`Added to cart: ${product.name}`);
//     };

//     // 2. RENDER LOGIC AT THE BOTTOM
//     if (loading) return <ProductInfoShimmer />;
    
//     if (!product) return (
//         <div className="flex flex-col items-center justify-center min-h-[60vh]">
//             <h2 className="text-2xl font-bold">Product Not Found</h2>
//             <p className="text-gray-500">The item you are looking for does not exist.</p>
//         </div>
//     );

//     return (
//         <div className="bg-white min-h-screen">
//             <div className='flex justify-center py-8'>
//                 <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.name }]} />
//             </div>

//             {/* <ProductDetails 
//                 product={product} 
//                 selectedVariant={selectedSize}          // Pass state
//                 setSelectedVariant={setSelectedSize}    // Pass setter
//             /> */}
//             <ProductDetails 
//                 product={product} 
//                 selectedVariant={selectedSize} 
//                 setSelectedVariant={setSelectedSize} 
//             />

//             <div className="max-w-7xl mx-auto px-4 py-12">
//                  <Tabs tabs={productTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
//              </div>
             
//              <AnnouncementBar />

//              <section className="w-full py-16 bg-gray-50">
//                  <div className="max-w-[1440px] mx-auto px-6">
//                      <h2 className="text-center text-4xl mb-12">Why Gentlehaus?</h2>
//                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                          {featureData.map((item, index) => (
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

//             <ProductCarousel title="You Might Also Like" products={DUMMY_PRODUCTS} />            
//             <ProductCarousel title="Recently Viewed Products" products={DUMMY_PRODUCTS} />

//             {/* <StickyPurchaseBar 
//                 product={product}
//                 show={showStickyBar}
//                 selectedSize={selectedSize}             // Same state
//                 setSelectedSize={setSelectedSize}       // Same setter
//                 onAddToCart={() => console.log("Added", product.name)}
//                 sizeOptions={product.variants.map(v => v.size)}
//             /> */}
//             {/* <StickyPurchaseBar 
//                 product={product}
//                 show={showStickyBar}
//                 selectedSize={selectedSize} // Full object passed down
//                 sizeOptions={sizeOptions}
//                 // When dropdown changes, find the full variant object to update the state
//                 setSelectedSize={(newSizeValue) => {
//                     const variant = product.variants.find(v => v.size === newSizeValue);
//                     setSelectedSize(variant);
//                 }}
//                 onAddToCart={handleAddToCart}
//             /> */}
            
//             <HappyCustomersCards />
//         </div>
//     );
// };

// export default InfoProd;