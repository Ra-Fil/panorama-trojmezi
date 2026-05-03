import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';

export const Tips: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section bg="white">
      <Heading>{t('tips.title')}</Heading>
      
      <div className="text-center mt-12 md:mt-20">
        <p className="text-xl text-ink/40 font-sans tracking-widest uppercase">
          {t('tips.preparing')}
        </p>
      </div>
    </Section>
  );
};
