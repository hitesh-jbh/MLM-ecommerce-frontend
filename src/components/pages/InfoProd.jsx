
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ProductDetails from '../ui/ProdDetail.jsx';
// import Breadcrumb from '../ui/BreadCrumb.jsx';
// import Tabs from '../ui/Tabs.jsx';
// import FeatureSection from '../ui/FeatureSection.jsx';
// import ProductCarousel from '../ui/ProductCarousel.jsx';
// import StickyPurchaseBar from '../ui/CardBottomFixed.jsx';
// import AnnouncementBar from "../ui/AnnouncementBar.jsx"
// import ProductInfoShimmer from '../ui/ProductInfoShimmer.jsx';

// const products = [
//     {
//       id: 1,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 2,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 3,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 4,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 5,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 6,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 7,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 8,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//   ];

// const DUMMY_PRODUCTS = [
//     {
//         id: 1,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"],

//     },
//     {
//         id: 2,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"]
//     },
//     {
//         id: 3,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"]
//     },
//     {
//         id: 4,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"]
//     },
//     {
//         id: 5,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"]
//     },
//     {
//         id: 6,
//         images: [
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//             'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
//         ],
//         title: "Men's Full Sleeve Cotton Shirt",
//         price: 'Rs. 971.00',
//         originalPrice: 'Rs. 1,479.00',
//         sizes: ["S", "M", "L", "XL"]
//     },
//     {
//       id: 7,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
//     {
//       id: 8,
//       image: ['https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240', 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'],
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//       brand: 'Gentlehaus',
//     },
// ];

// const InfoProd = () => {
//     const { id } = useParams();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState("");
//     const [showStickyBar, setShowStickyBar] = useState(false);
//     const [activeTab, setActiveTab] = useState('description');
//     const [loading, setLoading] = useState(true); // Add loading state
//     const [product, setProduct] = useState(null);

//     // Create the parameter object for both dropdowns
//     const sizeOptions = product?.sizes?.map(size => ({
//         label: `${size} - ${product.price}`,
//         value: size,
//         price: product.price
//     })) || [];

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         const handleScroll = () => {
//             // Shows bar after scrolling 600px
//             setShowStickyBar(window.scrollY > 600);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [id]);

//     useEffect(() => {
//         // Simulate an API call
//         setLoading(true);
//         setTimeout(() => {
//             const foundProduct = DUMMY_PRODUCTS.find((p) => p.id === Number(id));
//             setProduct(foundProduct);
//             setLoading(false);
//         }, 1500); // 1.5 seconds delay
        
//         window.scrollTo(0, 0);
//     }, [id]);

//     // Show shimmer while loading
//     if (loading) return <ProductInfoShimmer />;

//     if (!product) return <div className="p-20 text-center text-2xl font-bold">Product Not Found</div>;

//     const handleAddToCart = () => {
//         if (!selectedSize) {
//             alert("Please select a size first!");
//             return;
//         }
//         alert(`Successfully added to cart:\nProduct: ${product.title}\nSize: ${selectedSize}\nQuantity: ${quantity}`);
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         const handleScroll = () => {
//             setShowStickyBar(window.scrollY > 600);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [id]);

//     // Featured data
//     const featureData = [
//         { icon: "heroicons:shield-check", head: "Premium Quality", desc: "Crafted from 100% long-staple cotton." },
//         { icon: "heroicons:truck", head: "Fast Shipping", desc: "Pan-India delivery within 3-5 days." },
//         { icon: "heroicons:arrow-path", head: "Easy Returns", desc: "7-day hassle-free return policy." }
//     ];

//     // Define tabs inside or pass product data to them
//     const productTabs = [
//         { id: 'description', label: 'Description', content: <div className="p-4">Premium {product?.title}</div> },
//         { id: 'shipping', label: 'Shipping', content: <div className="p-4">3-5 Day Delivery</div> }
//     ];

    

//     if (!product) return <div className="p-20 text-center text-2xl font-bold">Product Not Found</div>;

//     return (
//         <div className="bg-white min-h-screen">
//             <div className='flex justify-center py-8'>
//                 <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.title }]} />
//             </div>

//             <ProductDetails 
//                 product={product} 
//                 selectedSize={selectedSize} 
//                 setSelectedSize={setSelectedSize} 
//                 quantity={quantity}
//                 setQuantity={setQuantity}
//                 sizeOptions={sizeOptions}
//                 onAddToCart={handleAddToCart}
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

//             <ProductCarousel title="You Might Also Like" products={products} />             
//             <ProductCarousel title="Recently Viewed Products" products={products} />

//             <StickyPurchaseBar
//                 show={showStickyBar}
//                 product={product}
//                 quantity={quantity}
//                 onQuantityChange={setQuantity}
//                 selectedSize={selectedSize}
//                 setSelectedSize={setSelectedSize}
//                 sizeOptions={sizeOptions}
//                 onAddToCart={handleAddToCart}
//             />
//         </div>
//     );
// };

// export default InfoProd;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../ui/ProdDetail.jsx';
import Breadcrumb from '../ui/BreadCrumb.jsx';
import Tabs from '../ui/Tabs.jsx';
import FeatureSection from '../ui/FeatureSection.jsx';
import ProductCarousel from '../ui/ProductCarousel.jsx';
import StickyPurchaseBar from '../ui/CardBottomFixed.jsx';
import AnnouncementBar from "../ui/AnnouncementBar.jsx";
import ProductInfoShimmer from '../ui/ProductInfoShimmer.jsx';
import HappyCustomersCards from "../ui/HappyCustomersCards.jsx"

const products = [
    {
      id: 1,
      image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 2,
      image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 3,
      image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 4,
      image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 5,
      image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 6,
      image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 7,
      image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 8,
      image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
  ];

const DUMMY_PRODUCTS = [
    {
        id: 1,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"],

    },
    {
        id: 2,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 5,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        images: [
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'
        ],
        title: "Men's Full Sleeve Cotton Shirt",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 7,
      image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
    {
      id: 8,
      image: ['https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240', 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240'],
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
      brand: 'Gentlehaus',
    },
];

const InfoProd = () => {
    const { id } = useParams();
    
    // 1. ALL HOOKS MUST BE AT THE TOP
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    // Simulate loading data
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        const handleScroll = () => {
            setShowStickyBar(window.scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [id]);

    // Define data consistently so hooks are not skipped
    const product = DUMMY_PRODUCTS.find((p) => p.id === Number(id));

    const sizeOptions = product?.sizes?.map(size => ({
        label: `${size} - ${product.price}`,
        value: size,
        price: product.price
    })) || [];

    const featureData = [
        { icon: "heroicons:shield-check", head: "Premium Quality", desc: "Crafted from 100% long-staple cotton." },
        { icon: "heroicons:truck", head: "Fast Shipping", desc: "Pan-India delivery within 3-5 days." },
        { icon: "heroicons:arrow-path", head: "Easy Returns", desc: "7-day hassle-free return policy." }
    ];

    const productTabs = [
        { id: 'description', label: 'Description', content: <div className="p-4">Premium {product?.title}</div> },
        { id: 'shipping', label: 'Shipping', content: <div className="p-4">3-5 Day Delivery</div> }
    ];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }
        alert(`Added to cart: ${product.title}`);
    };

    // 2. RENDER LOGIC AT THE BOTTOM
    if (loading) return <ProductInfoShimmer />;
    
    if (!product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <p className="text-gray-500">The item you are looking for does not exist.</p>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className='flex justify-center py-8'>
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: product.title }]} />
            </div>

            <ProductDetails 
                product={product} 
                selectedSize={selectedSize} 
                setSelectedSize={setSelectedSize} 
                quantity={quantity}
                setQuantity={setQuantity}
                sizeOptions={sizeOptions}
                onAddToCart={handleAddToCart}
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                 <Tabs tabs={productTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
             </div>
             
             <AnnouncementBar />

             <section className="w-full py-16 bg-gray-50">
                 <div className="max-w-[1440px] mx-auto px-6">
                     <h2 className="text-center text-4xl mb-12">Why Gentlehaus?</h2>
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

            <ProductCarousel title="You Might Also Like" products={products} />            
            <ProductCarousel title="Recently Viewed Products" products={products} />

            <StickyPurchaseBar
                show={showStickyBar}
                product={product}
                quantity={quantity}
                onQuantityChange={setQuantity}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                sizeOptions={sizeOptions}
                onAddToCart={handleAddToCart}
            />
            <HappyCustomersCards />
        </div>
    );
};

export default InfoProd;