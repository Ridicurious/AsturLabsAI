// src/components/HomePage/Section.tsx
import React, { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
    return (
        // Removed background color classes from here, just layout and padding
        <section id={id} className={`flex flex-col justify-center items-center text-center px-6 py-20 md:py-24 w-full ${className}`}>
            {children}
        </section>
    );
};

export default Section;