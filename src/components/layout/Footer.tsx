import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Mail, Phone, Star, MapPin } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS, APP_CONFIG } from '../../constants';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-white py-12 md:py-24 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
              {APP_CONFIG.name}
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 font-light italic leading-tight">
            {t('footer.title')}
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-md font-sans text-base">
            {t('footer.description')}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(APP_CONFIG.stars)].map((_, i) => (
                <Star key={i} size={10} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-[14px] md:text-[16px] text-gray-500 uppercase tracking-widest font-bold">Excellent {APP_CONFIG.rating}</span>
          </div>
        </div>

        <div>
          <h4 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold mb-10">
            {t('nav.contact')}
          </h4>
          <div className="flex flex-col gap-6 text-gray-400">
            <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="flex items-center gap-4 hover:text-gold transition-colors group">
              <Phone size={24} className="shrink-0 text-gold/50 group-hover:text-gold transition-colors" strokeWidth={2} />
              <span className="text-sm tracking-widest">{CONTACT_INFO.phone}</span>
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 hover:text-gold transition-colors group">
              <Mail size={24} className="shrink-0 text-gold/50 group-hover:text-gold transition-colors" strokeWidth={2} />
              <span className="text-sm tracking-widest">{CONTACT_INFO.email}</span>
            </a>
            <div className="flex items-center gap-4 group">
              <MapPin size={24} className="shrink-0 text-gold/50 transition-colors" strokeWidth={2} />
              <span className="text-sm tracking-widest">{CONTACT_INFO.address}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold mb-10">
            {t('footer.socialTitle')}
          </h4>
          <div className="flex gap-6">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-gold/20 rounded-full flex items-center justify-center text-gold hover:border-gold transition-all duration-500 group">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-24 pt-8 md:pt-12 border-t border-white/5 text-center text-gray-500 text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-bold">
        © {new Date().getFullYear()} {t('footer.copyright')}
      </div>
    </footer>
  );
};
