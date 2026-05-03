import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';

interface BookingProps {
  className?: string;
  hideHeader?: boolean;
}

export const Booking: React.FC<BookingProps> = ({ 
  className, 
  hideHeader = false
}) => {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Inject the external script for calendar resizing
    const script = document.createElement('script');
    script.src = "https://obsazenost.e-chalupy.cz/resize.js";
    script.async = true;
    document.body.appendChild(script);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://obsazenost.e-chalupy.cz') return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data.id === 'echalupy-kalendar' && data.height) {
          const iframe = document.getElementById('echalupy-kalendar');
          if (iframe) {
            iframe.style.height = `${data.height}px`;
          }
        }
      } catch (err) {
        // Ignore parsing errors from other messages
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Cleanup
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('message', handleMessage);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Calculate dynamic size based on window width to make months "responsive"
  const getVelikost = () => {
    const width = window.innerWidth;
    if (width < 640) return 4;
    if (width < 1024) return 5;
    return 6;
  };

  const [velikost, setVelikost] = useState(getVelikost());

  useEffect(() => {
    const handleResize = () => setVelikost(getVelikost());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sloupce = isMobile ? 12 : 4;
  const calendarUrl = `https://obsazenost.e-chalupy.cz/kalendar.php?id=22814&pocetMesicu=12&velikost=${velikost}&legenda=ne&vybraneMesice=&naStred=ne&ctvrtleti=ne&sloupce=${sloupce}&stin=ne&jazyk=cz&jednotky=ano&idJednotky=1&vypisJednotky=ne&souhrnny=&pozadi=ffffff&kalendarText=1a1a1a&kalendarPozadi=ffffff&ramecek=f3f3f3&mesicText=ffffff&mesicPozadi=c5a059&dnyText=1a1a1a&dnyPozadia=ffffff&obsazenoText=ffffff&obsazenoPozadi=c5a059&volnoText=1a1a1a&volnoPozadi=ffffff&castecneText=ffffff&castecnePozadi=e2c99a&neaktivniDnyText=999999&neaktivniDnyPozadi=ffffff&legendaText=1a1a1a&fontFamily=Inter,sans-serif&extCss=`;

  return (
    <Section bg="paper" id="booking" fullWidth={true} className={cn(hideHeader && "bg-transparent py-8 px-0")}>
      {!hideHeader && (
        <Heading>{t('booking.title')}</Heading>
      )}
      
      <div className="bg-white p-4 md:p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-full overflow-x-auto no-scrollbar flex justify-start lg:justify-center">
              <div className={cn(
                "w-full flex justify-start lg:justify-center",
                isMobile ? "min-w-[3200px]" : "max-w-full"
              )}>
                <iframe 
                  src={calendarUrl}
                  height="600px"
                  width="100%" 
                  frameBorder="0" 
                  id="echalupy-kalendar"
                  title="Kalendář obsazenosti"
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-12 pt-4 md:pt-8 border-t border-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center w-full md:justify-center lg:justify-start pb-2">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-4 h-4 rounded-sm bg-white border border-gray-200" />
                  <span className="text-ink/60 text-sm font-sans">{t('booking.legend.free')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-4 h-4 rounded-sm bg-[#e2c99a]" />
                  <span className="text-ink/60 text-sm font-sans">{t('booking.legend.oneApartment')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-4 h-4 rounded-sm bg-[#c5a059]" />
                  <span className="text-ink/60 text-sm font-sans">{t('booking.legend.full')}</span>
                </div>
              </div>

            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="text-ink font-sans text-center max-w-xl text-lg">
                {t('booking.ctaText')}
              </p>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-10 py-5 bg-gold text-white rounded-full text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-bold hover:bg-gold/90 transition-all shadow-lg hover:shadow-gold/20"
              >
                {t('hero.cta')}
              </button>
            </div>
          </div>
        </div>
    </Section>
  );
};
