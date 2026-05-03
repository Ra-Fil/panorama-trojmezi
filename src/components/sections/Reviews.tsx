import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading } from '../ui/Heading';

interface ReviewsProps {
  className?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ className }) => {
  const { t } = useTranslation();
  
  const reviews = t('reviews.items', { returnObjects: true }) as Array<{
    name: string;
    text: string;
    rating: number;
  }>;

  const isPaper = className?.includes('bg-paper');

  return (
    <section className={cn("pt-8 pb-12 md:pt-20 md:pb-32 px-4 md:px-6 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto">
        <Heading>{t('reviews.title')}</Heading>
        {t('reviews.subtitle') && (
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-sans leading-relaxed text-center mb-12 md:mb-16 -mt-4 md:-mt-6">
            {t('reviews.subtitle')}
          </p>
        )}

        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pt-8 pb-8 md:pt-0 md:pb-0 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {Array.isArray(reviews) && reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-8 md:p-12 rounded-2xl border border-gold/5 min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center",
                isPaper ? "bg-white" : "bg-paper"
              )}
            >
              <div className="absolute -top-6 left-12 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <Quote size={20} className="text-white" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-gray-600 font-sans leading-relaxed mb-8 text-base">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-ink">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
