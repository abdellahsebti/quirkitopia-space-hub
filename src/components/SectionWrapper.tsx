
import React from 'react';

interface SectionWrapperProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: string;
  centered?: boolean;
}

const SectionWrapper = ({
  id,
  title,
  subtitle,
  children,
  bgColor = 'bg-white dark:bg-dark',
  centered = false,
}: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''} mb-12`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-secondary">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
