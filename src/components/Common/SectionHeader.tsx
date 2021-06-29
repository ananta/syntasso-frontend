import React from 'react';

interface HeaderProps {
  title: string;
  ActionButton?: any;
  minified?: boolean;
}

const SectionHeader: React.FC<HeaderProps> = ({ title, ActionButton, minified }) => {
  return (
    <div className="flex mb-4 px-4 lg:px-0 items-center justify-between">
      {minified ? <h2 className="font-bold text-xl">{title}</h2> : <h2 className="font-bold text-3xl">{title}</h2>}
      {/* {link && } */}
      {ActionButton}
    </div>
  );
};

export default SectionHeader;
