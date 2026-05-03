import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';

interface HomeProps {
  onInquiryNow: () => void;
  onViewTips: () => void;
  onBooking: () => void;
}

export const Home: React.FC<HomeProps> = ({ onInquiryNow, onViewTips, onBooking }) => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-paper">
      <Hero onInquiryNow={onInquiryNow} onBooking={onBooking} />

      {/* About Section - Descriptive Blocks */}
      <Section bg="paper">
        <Heading>{t('about.title')}</Heading>

        <div className="space-y-20">
          {/* Introduction Block */}
          <article className="block text-left">
            <div className="lg:float-right lg:ml-12 lg:mb-8 lg:w-2/5 w-full mb-8 lg:mt-2">
              <div className="relative">
                <img 
                  src="/Panorama-trojmezi-hezke-ubytovani-beskydy-chalupa.webp" 
                  alt="Luxusní ubytování v Beskydech - Panorama Trojmezí Dolní Lomná" 
                  className="w-full h-auto rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/10 pointer-events-none" />
              </div>
            </div>
            <div className="group">
              <header>
                <h2 className="sr-only">O Panorama Trojmezí</h2>
              </header>
              <p className="text-ink/80 font-sans leading-relaxed text-lg mb-8" dangerouslySetInnerHTML={{ __html: t('about.intro1') }} />
              <p className="text-ink/80 font-sans leading-relaxed text-lg mb-8" dangerouslySetInnerHTML={{ __html: t('about.intro2') }} />
              <p className="text-ink/80 font-sans leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('about.intro3') }} />
            </div>
            <div className="clear-both" />
          </article>

              {/* Arrival Welcome Block */}
              <article className="group text-left">
                <header className="flex items-center justify-start gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-gold" />
                  <h3 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
                    {t('about.welcome.title')}
                  </h3>
                </header>
                <div className="text-ink/80 font-sans leading-relaxed text-lg max-w-7xl space-y-4">
                  <p>{t('about.welcome.text')}</p>
                </div>
              </article>

              {/* Sauna Block */}
              <article className="group text-left">
                <header className="flex items-center justify-start gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-gold" />
                  <h3 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
                    {t('about.sauna.title')}
                  </h3>
                </header>
                <div className="text-ink/80 font-sans leading-relaxed text-lg max-w-7xl">
                  <p dangerouslySetInnerHTML={{ __html: t('about.sauna.text') }} />
                </div>
              </article>
            </div>
      </Section>
    </div>
  );
};
