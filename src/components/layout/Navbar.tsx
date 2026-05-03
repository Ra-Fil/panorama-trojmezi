import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Menu, X, Home, Bed, MapPin, Phone, Image as ImageIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { cn } from '../../lib/utils';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isStandalonePage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'apartments', label: t('nav.apartments'), icon: Bed },
    { id: 'gallery', label: t('nav.gallery'), icon: ImageIcon },
    { id: 'tips', label: t('nav.tips'), icon: MapPin },
    { id: 'contact', label: t('nav.contact'), icon: Phone },
    { id: 'booking', label: t('nav.booking'), icon: FileText },
  ];

  const showBackground = isScrolled || isStandalonePage;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 md:py-6",
        showBackground ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between lg:gap-4 relative">
        {/* Desktop & Mobile Logo Container */}
        <div 
          className={cn(
            "flex items-center gap-2 cursor-pointer group z-20 lg:static lg:translate-x-0 absolute left-1/2 -translate-x-1/2 lg:left-0",
            !showBackground && "max-lg:opacity-0 max-lg:pointer-events-none"
          )}
          onClick={() => onSectionChange('home')}
        >
          <img 
            src="/Logo-panorama-trojmezi-bez-apt2.webp" 
            alt="Panorama Trojmezí" 
            className="h-7 md:h-10 lg:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "text-[11px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.2em] font-bold transition-all duration-500 relative py-2 group",
                !showBackground && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                item.id === 'booking'
                  ? "bg-gold text-white px-6 py-3 rounded-full hover:bg-gold/90 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-gold/20"
                  : (activeSection === item.id 
                    ? "text-gold" 
                    : (showBackground ? "text-ink/60 hover:text-ink" : "text-white hover:text-white/80"))
              )}
            >
              {item.label}
              {item.id !== 'booking' && (
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 transition-transform duration-500 origin-right group-hover:scale-x-100 group-hover:origin-left",
                  activeSection === item.id && "scale-x-100"
                )} />
              )}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-gold/30 mx-2" />
          <LanguageSwitcher isDark={showBackground} />
        </div>

        {/* Mobile Language - Left Side */}
        <div className="lg:hidden flex items-center z-20">
          <LanguageSwitcher isDark={showBackground} mobileCompact />
        </div>

        {/* Mobile Toggle - Right Side */}
        <div className="lg:hidden flex items-center z-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-300 border",
              showBackground 
                ? "text-gray-900 border-gold/20 bg-gold/5" 
                : "text-white border-white/20 bg-white/10"
            )}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold p-4 rounded-full transition-all duration-500",
                      item.id === 'booking'
                        ? "bg-gold text-white shadow-md"
                        : (activeSection === item.id 
                          ? "bg-paper text-gold border border-gold/10" 
                          : "text-ink/60 hover:text-ink hover:bg-paper")
                    )}
                  >
                    <item.icon 
                      size={14} 
                      className={cn(
                        item.id === 'booking'
                          ? "text-white"
                          : (activeSection === item.id ? "text-gold" : "text-ink/40")
                      )} 
                    />
                    {item.label}
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
