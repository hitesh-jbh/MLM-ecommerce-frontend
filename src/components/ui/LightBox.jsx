import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* Top Close Button (Mobile optimized) */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>

      {/* Main Image Container */}
      <div className="relative w-full h-[70vh] flex items-center justify-center p-4">
        <img 
          src={images[currentIndex].image} 
          alt="Zoomed View" 
          className="max-h-full max-w-full object-contain select-none shadow-2xl transition-all duration-500"
        />
      </div>

      {/* Controls Area */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="flex items-center gap-6 md:gap-12">
          <button onClick={onPrev} className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition active:scale-90">
            <ChevronLeft size={28} />
          </button>
          
          <button onClick={onClose} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition">
            Close
          </button>

          <button onClick={onNext} className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition active:scale-90">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dynamic Counter */}
        <div className="text-white/40 text-xs tracking-widest uppercase font-mono">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;