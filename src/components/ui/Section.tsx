import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'white' | 'paper' | 'ink';
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className, 
  id, 
  bg = 'white',
  fullWidth = false
}) => {
  const bgStyles = {
    white: 'bg-white',
    paper: 'bg-paper',
    ink: 'bg-ink'
  };

  return (
    <section 
      id={id}
      className={cn(
        "pt-8 pb-12 md:pt-20 md:pb-32 px-4 md:px-6 overflow-hidden",
        bgStyles[bg],
        className
      )}
    >
      <div className={cn(fullWidth ? "w-full lg:max-w-[90%] xl:max-w-[90%] mx-auto" : "max-w-7xl mx-auto")}>
        {children}
      </div>
    </section>
  );
};
