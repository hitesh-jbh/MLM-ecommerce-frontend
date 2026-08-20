import React, { useEffect, useState } from 'react';
import api from "../../utils/api/axiosInstance.js";

const SaleBannerStrip = () => {
  const [saleBanner, setSaleBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSaleBanner = async () => {
      try {
        // बैकएंड से सिर्फ 'sale' टाइप वाले बैनर मंगवा रहे हैं
        const response = await api.get('/api/banners?type=sale');
        const banners = response.data.data || response.data;
        
        // अगर बैनर मौजूद है, तो सबसे पहला वाला सेट कर दो
        if (banners && banners.length > 0) {
          setSaleBanner(banners[0]); 
        }
      } catch (error) {
        console.error("Failed to fetch sale banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleBanner();
  }, []);

  if (isLoading || !saleBanner) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-10 animate-in fade-in duration-700">
      {saleBanner.link_url ? (
        <a href={saleBanner.link_url} className="block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <img 
            src={saleBanner.image_url} 
            alt={saleBanner.title || "Promotional Sale"} 
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </a>
      ) : (
        <div className="w-full overflow-hidden rounded-2xl shadow-sm">
          <img 
            src={saleBanner.image_url} 
            alt={saleBanner.title || "Promotional Sale"} 
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </div>
      )}
    </div>
  );
};

export default SaleBannerStrip;