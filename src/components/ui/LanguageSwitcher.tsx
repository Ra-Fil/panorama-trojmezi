import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const languages = [
  { code: 'cs', name: 'Čeština', label: 'CZ', flag: '/cz.webp' },
  { code: 'en', name: 'English', label: 'EN', flag: '/gb.webp' }
];

interface LanguageSwitcherProps {
  isDark?: boolean;
  mobileCompact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isDark, mobileCompact }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", mobileCompact ? "w-[85px]" : "w-[110px]")} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between transition-all duration-500 group border border-transparent hover:border-gold/20 rounded-lg",
          mobileCompact ? "px-2.5 py-2" : "px-4 py-2.5",
          isDark 
            ? "text-ink/60 hover:text-ink" 
            : "text-white/70 hover:text-white"
        )}
      >
        <div className="flex items-center gap-2">
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.label} 
            className="w-5 h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <span className="text-[11px] font-bold tracking-widest">{currentLanguage.label}</span>
        </div>
        <ChevronDown 
          size={10} 
          className={cn(
            "transition-transform duration-500 opacity-40 group-hover:opacity-100 text-gold",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 right-0 mt-2 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gold/10 overflow-hidden z-[60] rounded-xl"
          >
            <div className="py-1 bg-paper/30">
              {languages
                .filter(lang => lang.code !== i18n.language)
                .map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-start gap-3 px-4 py-3 transition-all duration-500 group hover:bg-white"
                  >
                    <img 
                      src={lang.flag} 
                      alt={lang.label} 
                      className="w-5 h-auto object-contain transition-all duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] font-bold tracking-widest text-ink/60 group-hover:text-ink">{lang.label}</span>
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
