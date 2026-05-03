import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading } from '../ui/Heading';

const galleryImages = [
  { url: "/Panorama-trojmezi-hezke-ubytovani-beskydy-chalupa.webp", title: "Areál chalupy", category: "exterior" },
  { url: "/Panorama-trojmezi-ubytovani-beskydy-apartman-2.webp", title: "Interiér apartmánu", category: "interior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-1.webp", title: "Exteriér", category: "exterior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-koupelna-1.webp", title: "Moderní koupelna", category: "interior" },
  { url: "/ubytovani-trojmezi-sauna.jpg", title: "Sauna", category: "exterior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-pokoj-1.webp", title: "Ložnice", category: "interior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-chalupa-3.webp", title: "Pohled na chalupu", category: "exterior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-chalupa-se-saunou.webp", title: "Relaxační zóna", category: "exterior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-vyhled.webp", title: "Panoramatický výhled", category: "view" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-ciste-pokoje-1.webp", title: "Interiér pokoje", category: "interior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-s-vyhledem.webp", title: "Výhled z terasy", category: "view" },
  { url: "/Panorama-trojmezi-ubytovani-beskydy-apartman-1.webp", title: "Apartmán", category: "interior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-pokoj-3.webp", title: "Útulný pokoj", category: "interior" },
  { url: "/Panorama-trojmezi-luxusni-ubytovani-beskydy-koupelna-2.webp", title: "Vybavení koupelny", category: "interior" },
  { url: "/Panorama-trojmezi-ubytovani-beskydy-apartman-3.webp", title: "Interiér apartmánu", category: "interior" },
  { url: "/Panorama-trojmezi-ubytovani-beskydy-apartman-4.webp", title: "Detail apartmánu", category: "interior" },
  { url: "/Panorama-trojmezi-krasne-ubytovani-beskydy-chalupa-s-terasou.webp", title: "Terasa chalupy", category: "exterior" },  
];

export const PropertyGallery: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev! + 1) % galleryImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-32 px-6 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Heading>{t('gallery.title')}</Heading>

        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {galleryImages.map((image, index) => {
            const isLastMd = index === 5;
            const isLastLg = index === 7;
            const isLastXl = index === 9;
            const isPotentialLast = isLastMd || isLastLg || isLastXl;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-gray-100 min-w-[65vw] sm:min-w-[35vw] md:min-w-0 snap-center",
                  index >= 6 && "md:hidden lg:block",
                  index >= 8 && "lg:hidden xl:block",
                  index >= 10 && "xl:hidden"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Standard Hover Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-ink/20 transition-colors duration-500",
                  !isPotentialLast && "group-hover:bg-ink/40"
                )} />
                
                {/* Regular Hover Icon */}
                <div className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  isPotentialLast && "md:hidden" // Hide regular hover on potential last items for desktop
                )}>
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 size={24} className="text-gold" />
                  </div>
                </div>

                {/* "Show More" Overlay - Desktop Only */}
                {isPotentialLast && (
                  <div className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center bg-ink/70 transition-all duration-500 group-hover:bg-ink/80 hidden",
                    isLastMd && "md:flex lg:hidden",
                    isLastLg && "lg:flex xl:hidden",
                    isLastXl && "xl:flex"
                  )}>
                    <div className="text-center px-6">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30 group-hover:bg-gold/20 transition-all duration-500">
                        <Plus size={20} className="text-gold" />
                      </div>
                      <span className="text-white text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold block leading-relaxed max-w-[120px] mx-auto">
                        {t('gallery.viewMore')}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 flex justify-center md:hidden">
          <div className="flex gap-2">
            {galleryImages.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === 0 ? 'bg-gold' : 'bg-gold/20'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <button 
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
              onClick={prevImage}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
              onClick={nextImage}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    nextImage();
                  } else if (info.offset.x > threshold) {
                    prevImage();
                  }
                }}
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg cursor-grab active:cursor-grabbing touch-none"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              <div className="text-center select-none">
                <p className="text-white/50 font-sans text-lg">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
