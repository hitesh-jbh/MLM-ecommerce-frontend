import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/axiosInstance.js";

// Components
import CategoryStrip from "../../components/ui/CategoryStrip.jsx";
import Hero from "../../components/ui/Hero.jsx";
import SaleBannerStrip from "../../components/ui/SaleBannerStrip.jsx";
import ProductCarousel from "../../components/ui/ProductCarousel.jsx";
import ScrollingBanner from "../../components/ui/ScrollingBannerCarousel.jsx";
import CoastalEdition from "../../components/ui/CoastalEdition .jsx";
import IconButton from "../../components/ui/TwoImgOnHome.jsx";
import ImageShowcase from "../../components/ui/ImageShowcase.jsx";
import FeaturesSection from "../../components/ui/FeatureCard.jsx";
import HomeShimmer from "../../components/shimmer/HomeShimmer.jsx";
import Footer from "../../components/partials/footer/footer.jsx";
import ErrorState from "./ErrorState.jsx";

// Constants & Utils
import { viewAllProducts } from "../../utils/service/apiService";

export const Home = () => {
  // 1. Fetch Main Categories (For Page Sections) सीधे API से
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCatError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/categories");
      // बैकएंड के रिस्पॉन्स स्ट्रक्चर के हिसाब से (res.data.data)
      return res.data.data || [];
    },
  });

  // 2. Fetch Collections (For Category Strip) सीधे API से
  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await api.get("/api/categories/home-strip");
      return res.data.data || [];
    },
  });

  // 3. Fetch All Products
  const {
    data: productData,
    isLoading: isProductsLoading,
    isError: isProdError,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: viewAllProducts,
  });

  const activeCategories = useMemo(() => {
    return categories.sort(
      (a, b) => a.order - b.order || a.display_order - b.display_order,
    );
  }, [categories]);

  const activeCollections = useMemo(() => {
    return collections
      .filter((col) => col.is_active || col.active)
      .sort((a, b) => a.order - b.order || a.display_order - b.display_order);
  }, [collections]);

  const allProducts = useMemo(() => {
    const rawData =
      productData?.data?.products ||
      productData?.products ||
      productData?.data ||
      [];
    return Array.isArray(rawData) ? rawData : [];
  }, [productData]);

  const newArrivalProducts = useMemo(() => {
    if (!allProducts.length) return [];
    return [...allProducts].sort((a, b) => b.id - a.id).slice(0, 8);
  }, [allProducts]);

  const filteredCategories = useMemo(() => {
    return activeCategories.filter(
      (cat) =>
        cat.slug !== "new-arrivals" &&
        cat.name.toLowerCase() !== "new arrivals",
    );
  }, [activeCategories]);

  // Global Loading State
  if (isCategoriesLoading || isProductsLoading) return <HomeShimmer />;

  return (
    <div className="bg-dirora-ivory min-h-screen">
      {/* Hero Slider (यह अपने अंदर खुद बैनर्स फेच कर रहा है) */}
      <Hero />

      {/* Category Strip (API से आया डेटा पास कर रहे हैं) */}
      <CategoryStrip categories={activeCollections} />

      {/* 👇 2. यहाँ हमने सेल बैनर लगा दिया है! अब API कॉल होगी */}
      <SaleBannerStrip />

      {/* 5. AUTO-GENERATED CATEGORY SECTIONS */}
      {isCatError || isProdError ? (
        <ErrorState
          message="We're having trouble reaching our servers. Please check your connection."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="flex flex-col gap-6 md:gap-8 pt-2 pb-10 md:pt-4 md:pb-16">
          
          {/* सबसे ऊपर: असली NEW ARRIVALS */}
          {newArrivalProducts.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <ProductCarousel
                title="NEW ARRIVALS"
                products={newArrivalProducts}
              />
            </div>
          )}

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => {
              
              const categoryProducts = allProducts.filter((p) => {
                const isDirectMatch =
                  String(p.categoryId) === String(category.id) ||
                  String(p.category_id) === String(category.id) ||
                  p.category === category.slug ||
                  p.category === category.name;

                const isSubCatMatch = category.subCategories?.some(
                  (sub) => 
                    String(p.category_id) === String(sub.id) || 
                    String(p.categoryId) === String(sub.id)
                );

                return isDirectMatch || isSubCatMatch;
              });

              if (categoryProducts.length === 0) return null;

              return (
                <div
                  key={category.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                >
                  <ProductCarousel
                    title={category.name}
                    products={categoryProducts}
                  />
                </div>
              );
            })
          ) : null}
        </div>
      )}

      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
