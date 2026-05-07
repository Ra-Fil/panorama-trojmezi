import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { sanitizeHtml } from '../../lib/utils';

export const Tips: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section bg="white">
      <Heading>{t('tips.title')}</Heading>

      <div className="mt-12 md:mt-20 max-w-3xl mx-auto">
        <div
          className="rich-text text-ink/80 font-sans leading-relaxed text-lg [&>p]:mb-6 [&>p:last-child]:mb-0 [&>ul]:mb-6 [&>ol]:mb-6 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(t('tips.preparing')) }}
        />
      </div>
    </Section>
  );
};
