import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    isInverted?: boolean;
    hasPattern?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, isInverted, hasPattern }) => (
    <div
        className={isInverted ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
        style={{
            backgroundImage:
                hasPattern &&
                ` url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%232d3748' fill-opacity='0.32' fill-rule='evenodd'/%3E%3C/svg%3E"`,
        }}
    >
        <div className={'container mx-auto '}>{children}</div>
    </div>
);

export default Section;
