import React from 'react';

const ProductViewLayout = ({ gallerySlot, detailsSlot }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Gallery: Sticky on Desktop so images stay visible while reading long info */}
        <div className="lg:sticky lg:top-24">
          {gallerySlot}
        </div>
        {/* Info Column */}
        <div className="flex flex-col space-y-6">
          {detailsSlot}
        </div>
      </div>
    </div>
  );
};

export default ProductViewLayout;