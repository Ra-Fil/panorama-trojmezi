import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  underline?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  className,
  italic = true,
  align = 'center',
  animate = true,
  underline = true
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const lineAlignStyles = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  const content = (
    <div className={cn("mb-8 md:mb-12", alignStyles[align])}>
      <Component 
        className={cn(
          "text-4xl md:text-7xl font-serif text-ink mb-4 md:mb-6 font-light",
          italic && "italic",
          className
        )}
      >
        {children}
      </Component>
      {underline && (
        <div className={cn("w-24 h-[1px] bg-gold/60", lineAlignStyles[align])} />
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
