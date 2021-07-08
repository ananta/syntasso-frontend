import React from 'react';

interface HeaderProps {
  title: string;
  ActionButton?: any;
  minified?: boolean;
}

const SectionHeader: React.FC<HeaderProps> = ({ title, ActionButton, minified }) => {
  return (
    <div className="flex mb-4 px-4 lg:px-0 items-center justify-between">
      {minified ? (
        <h2 className="font-bold text-xl">{title}</h2>
      ) : (
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl" style={{ color: '#2D3748' }}>
            {title}
          </h2>
        </div>
      )}
      {/* {link && } */}
      {ActionButton}
    </div>
  );
};

export default SectionHeader;
