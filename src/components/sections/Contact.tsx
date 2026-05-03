import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { CONTACT_INFO } from '../../constants';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const contactItems = [
    { icon: Phone, value: CONTACT_INFO.phone, sub: '' },
    { icon: Mail, value: CONTACT_INFO.email, sub: '' },
    { icon: MapPin, value: CONTACT_INFO.address, sub: 'část Novina' },
    { icon: Clock, value: t('contact.checkIn'), sub: t('contact.checkOut') },
  ];

  return (
    <Section bg="paper" id="contact">
      <Heading animate={false}>{t('contact.title')}</Heading>
      
      <div className="space-y-10 md:space-y-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 md:gap-x-20">
          {contactItems.map((item, index) => (
            <div 
              key={index}
              className="group flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left"
            >
              <div className="w-16 h-16 shrink-0 bg-white border border-gold/10 text-gold rounded-full flex items-center justify-center shadow-sm">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="pt-2">
                <p className="text-xl md:text-2xl font-sans text-ink mb-2">{item.value}</p>
                {item.sub && (
                  <p className={item.icon === Clock ? "text-xl md:text-2xl font-sans text-ink" : "text-ink/60 text-[14px] md:text-[16px] uppercase tracking-widest font-bold"}>
                    {item.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold" />
                <h3 className="text-gold tracking-[0.3em] uppercase text-[14px] md:text-[16px] font-bold">
                  {t('contact.arrival.title')}
                </h3>
              </div>
              <div className="text-ink/80 font-sans leading-relaxed text-lg space-y-4 max-w-7xl">
                <p>
                  {t('contact.arrival.text1')}
                </p>
                <p>
                  {t('contact.arrival.text2')}
                </p>
              </div>
            </div>

            <div 
              className="h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-sm border border-gold/10 bg-gray-100 relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41342.34862590214!2d18.6186851!3d49.5476313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471415004113e6ad%3A0x2863ec327f12e84d!2zQXBhcnRtw6FuIFBhbm9yYW1hIFRyb2ptZXrDrQ!5e0!3m2!1scs!2scz!4v1714158400000!5m2!1scs!2scz" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Mapa Panorama Trojmezí"
                className="w-full h-full"
              />
            </div>
          </div>
    </Section>
  );
};
