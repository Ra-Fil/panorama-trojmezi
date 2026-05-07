import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, Maximize, Wifi, Waves, Layout, Image as ImageIcon } from 'lucide-react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { sanitizeHtml } from '../../lib/utils';

interface ApartmentsProps {
  onViewGallery?: () => void;
}

export const Apartments: React.FC<ApartmentsProps> = ({ onViewGallery }) => {
  const { t } = useTranslation();

  return (
    <Section bg="white">
      <Heading>{t('apartments.title')}</Heading>

      <article className="group">
        <div className="px-2">
          <div className="block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:float-right lg:ml-12 lg:mb-8 lg:w-2/5 w-full mb-8 lg:mt-2"
            >
              <div className="relative group/img-container cursor-pointer" onClick={onViewGallery}>
                <img 
                  src="/Panorama-trojmezi-ubytovani-beskydy-apartman-2.webp" 
                  alt="Luxusní interiér apartmánu Panorama Trojmezí s moderním vybavením"
                  className="w-full h-auto rounded-2xl grayscale-[0.2] group-hover/img-container:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/10 pointer-events-none" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover/img-container:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300">
                     <ImageIcon size={18} className="text-gold" />
                     <span className="text-ink font-bold text-sm uppercase tracking-wider">{t('apartments.facilities.viewGallery')}</span>
                  </div>
                </div>
              </div>
              {/* Secondary text link below image */}
              <button 
                onClick={onViewGallery}
                className="mt-3 flex items-center gap-2 text-gold hover:text-gold/70 transition-all font-bold uppercase tracking-widest text-[13px] group/link"
                aria-label={t('apartments.facilities.viewGallery')}
              >
                <ImageIcon size={14} className="group-hover/link:scale-110 transition-transform" />
                <span className="border-b border-transparent group-hover/link:border-gold/30 transition-colors pb-0.5">{t('apartments.facilities.viewMorePhotos')}</span>
              </button>
            </motion.div>
            <p className="text-ink/80 leading-relaxed font-sans text-lg" dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('apartments.intro')) }} />
            <div
              className="rich-text mt-8 text-ink/80 text-lg [&_ul]:space-y-2"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('apartments.layout.text')) }}
            />
            <div className="clear-both" />
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-12 border-t border-gray-100 pt-10 mb-12">
            <div className="flex items-center gap-4 text-ink/70">
              <Users className="text-gold" size={16} strokeWidth={1.5} />
              <span className="text-[14px] md:text-[16px] uppercase tracking-widest font-bold">{t('apartments.features.capacity')}</span>
            </div>
            <div className="flex items-center gap-4 text-ink/70">
              <Maximize className="text-gold" size={16} strokeWidth={1.5} />
              <span className="text-[14px] md:text-[16px] uppercase tracking-widest font-bold">{t('apartments.features.size')}</span>
            </div>
            <div className="flex items-center gap-4 text-ink/70">
              <Layout className="text-gold" size={16} strokeWidth={1.5} />
              <span className="text-[14px] md:text-[16px] uppercase tracking-widest font-bold">{t('apartments.features.disposition')}</span>
            </div>
            <div className="flex items-center gap-4 text-ink/70">
              <Wifi className="text-gold" size={16} strokeWidth={1.5} />
              <span className="text-[14px] md:text-[16px] uppercase tracking-widest font-bold">{t('apartments.features.wifi')}</span>
            </div>
            <div className="flex items-center gap-4 text-ink/70">
              <Waves className="text-gold" size={16} strokeWidth={1.5} />
              <span className="text-[14px] md:text-[16px] uppercase tracking-widest font-bold">{t('apartments.features.sauna')}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-12">
            <div className="flex items-center justify-start gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gold" />
              <h3 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
                {t('apartments.facilities.title')}
              </h3>
            </div>
            <div
              className="rich-text text-ink/80 font-sans leading-relaxed text-lg [&>p]:mb-6 [&>p:last-child]:mb-0 [&>ul]:mb-6 [&>ol]:mb-6 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('apartments.facilities.text')) }}
            />
          </div>

          {/* Pricing Section */}
          <div className="border-t border-gray-100 pt-10 mt-10">
            <div className="flex items-center justify-start gap-4 mb-12">
              <div className="w-12 h-[1px] bg-gold" />
              <h3 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
                {t('apartments.pricing.title')}
              </h3>
            </div>

            <div className="space-y-16">
              {/* Seasons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* High Season */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-4xl font-serif text-ink mb-2 font-bold">{t('apartments.pricing.highSeason.title')}</h4>
                    <p className="text-ink/40 text-[14px] uppercase tracking-widest font-bold">
                      {t('apartments.pricing.highSeason.dates')}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4 group/price">
                      <div>
                        <p className="text-ink font-sans text-lg font-medium">{t('apartments.pricing.stays.weekly')}</p>
                        <p className="text-ink/50 text-sm">{t('apartments.pricing.stays.weeklyDesc')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif text-gold">{t('apartments.pricing.highSeason.weeklyPrice')}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4 group/price">
                      <div>
                        <p className="text-ink font-sans text-lg font-medium">{t('apartments.pricing.stays.short')}</p>
                        <p className="text-ink/50 text-sm">{t('apartments.pricing.stays.shortDesc')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif text-gold">{t('apartments.pricing.highSeason.shortPrice')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Low Season */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-4xl font-serif text-ink mb-2 font-bold">{t('apartments.pricing.lowSeason.title')}</h4>
                    <p className="text-ink/40 text-[14px] uppercase tracking-widest font-bold">
                      {t('apartments.pricing.lowSeason.dates')}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4 group/price">
                      <div>
                        <p className="text-ink font-sans text-lg font-medium">{t('apartments.pricing.stays.weekly')}</p>
                        <p className="text-ink/50 text-sm">{t('apartments.pricing.stays.weeklyDesc')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif text-gold">{t('apartments.pricing.lowSeason.weeklyPrice')}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4 group/price">
                      <div>
                        <p className="text-ink font-sans text-lg font-medium">{t('apartments.pricing.stays.short')}</p>
                        <p className="text-ink/50 text-sm">{t('apartments.pricing.stays.shortDesc')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif text-gold">{t('apartments.pricing.lowSeason.shortPrice')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Info */}
              <div className="py-4">
                <p className="text-ink/80 font-sans leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('apartments.pricing.footer')) }} />
              </div>

              {/* Holidays */}
              <div className="bg-white p-10 rounded-2xl border border-gold/20 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold/30" />
                <h4 className="text-2xl font-serif mb-8 border-b border-gray-100 pb-4 text-ink font-bold">{t('apartments.pricing.special.title')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-2">
                    <p className="text-gold uppercase tracking-[0.2em] text-[13px] md:text-[14px] font-bold">{t('apartments.pricing.special.christmas')}</p>
                    <p className="text-4xl font-serif text-ink">{t('apartments.pricing.special.christmasPrice')}</p>
                    <p className="text-ink/40 text-base">{t('apartments.pricing.special.details')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gold uppercase tracking-[0.2em] text-[13px] md:text-[14px] font-bold">{t('apartments.pricing.special.silvestr')}</p>
                    <p className="text-4xl font-serif text-ink">{t('apartments.pricing.special.silvestrPrice')}</p>
                    <p className="text-ink/40 text-base">{t('apartments.pricing.special.details')}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 text-ink/40 text-base leading-relaxed">
                  {t('apartments.pricing.special.footer')}
                </div>
              </div>

              <div
                className="text-ink text-sm italic [&>p]:mb-2 [&>p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('apartments.pricing.notesText')) }}
              />
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
};
