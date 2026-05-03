import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 opacity-20 hover:opacity-30 transition-opacity duration-1000">
            <img 
              src="/Logo-panorama-hory.webp" 
              alt="Beskydy Mountains Silhouette" 
              className="w-full max-w-sm mx-auto grayscale invert"
              referrerPolicy="no-referrer"
            />
          </div>

          <span className="text-gold tracking-[0.5em] uppercase text-xs md:text-sm mb-6 block font-bold">
            {t('error.title404')}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 italic">
            {t('error.pageNotFound')}
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl font-sans mb-12 max-w-md mx-auto leading-relaxed">
            {t('error.fogText')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 bg-gold text-white px-10 py-5 rounded-sm hover:bg-white hover:text-ink transition-all duration-500 shadow-xl shadow-gold/10 font-bold uppercase tracking-[0.2em] text-xs"
              >
                <Home size={16} className="transition-transform group-hover:-translate-y-0.5" />
                {t('error.goHome')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
