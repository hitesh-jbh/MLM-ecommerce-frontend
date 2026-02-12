import React, { useMemo } from "react";
import useSWR from "swr";

// Components
import Hero from "../../components/ui/Hero.jsx";
import ProductCarousel from "../../components/ui/ProductCarousel.jsx";
import ScrollingBanner from "../../components/ui/ScrollingBannerCarousel.jsx";
import CoastalEdition from "../../components/ui/CoastalEdition .jsx";
import IconButton from "../../components/ui/TwoImgOnHome.jsx";
import ImageShowcase from "../../components/ui/ImageShowcase.jsx";
import FeaturesSection from "../../components/ui/FeatureCard.jsx";
import HomeShimmer from "../../components/shimmer/HomeShimmer.jsx";
import Footer from "../../components/partials/footer/footer.jsx";

// Constants & Utils
import { webSocialHandle, webSocialLink } from "../../utils/constants.jsx";
import { viewAllProducts } from "../../utils/service/apiService.js";
import ErrorState from "./ErrorState.jsx";

export const Home = () => {
  // 1. SWR Fetching (added 'mutate' to allow manual retry)
  const { data, error, isLoading, mutate } = useSWR("/api/product/", viewAllProducts);

  // 2. Memoize Product Data
  const products = useMemo(() => {
    const rawData = data?.data?.products || data?.products || data;
    return Array.isArray(rawData) ? rawData : [];
  }, [data]);

  // 3. Global Loading State (Full Page Shimmer)
  if (isLoading) return <HomeShimmer />;

  return (
    <>
      <Hero />

      {/* 4. Conditional Rendering for Product Section */}
      {error ? (
        <ErrorState 
          message="We're having trouble reaching our servers. Please check your connection." 
          onRetry={() => mutate()} 
        />
      ) : (
        <ProductCarousel title="You are in new arrivals" products={products} />
      )}

      <ScrollingBanner />
      <CoastalEdition />
      <IconButton />

      {/* Instagram Section */}
      <div className="max-w-8xl mx-auto py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl px-18 md:text-4xl lg:text-6xl font-light text-[#1a1a1a] mb-6 tracking-tight">
            Follow us Instagram
          </h2>

          <div className="space-y-1 mb-10">
            <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
              Tag <span className="font-medium text-black">{webSocialHandle}</span> in your Instagram photos 
              for a chance to be featured here.
            </p>
            <p className="text-gray-600 text-base md:text-lg font-light">
              Find more inspiration on{' '}
              <a 
                href={webSocialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black underline underline-offset-4 hover:text-gray-500 transition-colors decoration-1"
              >
                our Instagram.
              </a>
            </p>
          </div>
        </div>
      </div>

      <ImageShowcase />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default Home;







// import React, { useMemo } from "react";
// // Components
// import Hero from "../../components/ui/Hero.jsx";
// import ProductCarousel from "../../components/ui/ProductCarousel.jsx";
// import ScrollingBanner from "../../components/ui/ScrollingBannerCarousel.jsx";
// import CoastalEdition from "../../components/ui/CoastalEdition .jsx"
// import IconButton from "../../components/ui/TwoImgOnHome.jsx"
// import HappyCustomersCards from "../../components/ui/HappyCustomersCards.jsx"
// import ImageShowcase from "../../components/ui/ImageShowcase.jsx"
// import FeaturesSection from "../../components/ui/FeatureCard.jsx";
// import HomeShimmer from "../../components/shimmer/HomeShimmer.jsx";
// // constants & Utils
// import { webSocialHandle, webSocialLink } from "../../utils/constants.jsx";
// import { viewAllProducts } from "../../utils/service/apiService.js";
// import useSWR from "swr";
// import Footer from "../../components/partials/footer/footer.jsx";

// export const Home = () => {
//   // 1. SWR Fetching
//   const { data, error, isLoading } = useSWR("/api/product/", viewAllProducts);

//   // 2. Memoize Product Data
//   const products = useMemo(() => {
//     const rawData = data?.data?.products || data?.products || data;
//     return Array.isArray(rawData) ? rawData : [];
//   }, [data]);

//   // 3. Show Shimmer while loading or if there's no data yet
//   if (isLoading) return <HomeShimmer />;
  
//   // Optional: Handle Error state
//   if (error) return <div>Failed to load products. Please try again later.</div>;

//   return (
//     <>
//       <Hero />
//       {/* 4. Pass the SWR products to the Carousel */}
//       <ProductCarousel title="You are in new arrivals" products={products} />
      
//       <ScrollingBanner />
//       <CoastalEdition />
//       <IconButton />
//       {/* <HappyCustomersCards /> */}
      
//       <div className="max-w-8xl mx-auto py-12">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl px-18 md:text-4xl lg:text-6xl font-light text-[#1a1a1a] mb-6 tracking-tight">
//             Follow us Instagram
//           </h2>

//           <div className="space-y-1 mb-10">
//             <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
//               Tag <span className="font-medium text-black">{webSocialHandle}</span> in your Instagram photos 
//               for a chance to be featured here.
//             </p>
//             <p className="text-gray-600 text-base md:text-lg font-light">
//               Find more inspiration on{' '}
//               <a 
//                 href={webSocialLink} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-black underline underline-offset-4 hover:text-gray-500 transition-colors decoration-1"
//               >
//                 our Instagram.
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <ImageShowcase />
//       <FeaturesSection />
//       <Footer />

//     </>
//   );
// };

// export default Home;