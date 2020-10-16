import React from 'react';

interface HeaderProps {
  title: string;
  link?: string;
  minified?: boolean;
}

const SectionHeader: React.FC<HeaderProps> = ({ title, link, minified }) => {
  return (
    <div className="flex mb-4 px-4 lg:px-0 items-center justify-between">
      {minified ? <h2 className="font-bold text-xl">{title}</h2> : <h2 className="font-bold text-3xl">{title}</h2>}
      {link && <a className="bg-gray-200 hover:bg-green-200 text-gray-800 px-3 py-1 rounded cursor-pointer">{link}</a>}
    </div>
  );
};

export default SectionHeader;
