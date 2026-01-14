import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from './ProdDetail.jsx';
import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import FeatureSection from '../../components/ui/FeatureSection.jsx';
import ProductCarousel from '../../components/ui/ProductCarousel.jsx';
import AnnouncementBar from "../../components/ui/AnnouncementBar.jsx";
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer.jsx';
import HappyCustomersCards from "../../components/ui/HappyCustomersCards.jsx";

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
                    <p>{product.description}</p>
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
