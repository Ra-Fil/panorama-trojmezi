import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { motion } from 'motion/react';

interface HeroProps {
  onInquiryNow: () => void;
  onBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onInquiryNow, onBooking }) => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0 w-full h-full">
          <img 
            src="/Panorama-trojmezi-luxusni-ubytovani-beskydy-vyhled.webp" 
            alt="Beskydy Mountains View" 
            className="w-full h-full object-cover brightness-[0.35] scale-105"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-white mb-10 leading-[1.1] flex flex-col items-center drop-shadow-md">
            <img 
              src="/Logo-panorama-hory.webp" 
              alt="Beskydy Mountains Silhouette" 
              className="w-[80%] max-w-[280px] md:max-w-[450px] lg:max-w-none h-auto md:h-20 lg:h-32 mb-8 md:mb-12 opacity-90 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-3 md:mb-5 text-white tracking-[0.3em] uppercase font-sans not-italic font-semibold">
              {t('hero.titlePrefix')}
            </span>
            <span className="text-[40px] leading-[1.1] sm:text-[52px] md:text-[64px] lg:text-[80px] xl:text-9xl md:whitespace-nowrap font-light tracking-tight md:leading-none">
              {t('hero.titleMain')}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] xl:text-[2.7rem] text-gold mb-12 md:mb-16 font-medium max-w-6xl xl:max-w-none mx-auto font-serif italic leading-snug md:leading-relaxed drop-shadow-2xl px-6 lg:whitespace-nowrap text-balance lg:text-nowrap">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Desktop Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onInquiryNow}
              className="hidden lg:block px-8 md:px-16 py-6 border border-gold bg-transparent hover:bg-gold text-white hover:text-ink rounded-full shadow-2xl transition-all duration-300 tracking-[0.4em] uppercase text-[12px] md:text-[14px] font-bold"
            >
              {t('hero.cta')}
            </motion.button>

            {/* Mobile/Tablet Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBooking}
              className="lg:hidden px-8 md:px-16 py-6 border border-gold bg-transparent hover:bg-gold text-white hover:text-ink rounded-full shadow-2xl transition-all duration-300 tracking-[0.4em] uppercase text-[12px] md:text-[14px] font-bold"
            >
              {t('nav.booking')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
