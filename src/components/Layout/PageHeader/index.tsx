import React from 'react';

interface PageHeaderProps {
  subTitle: string;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle }) => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-md leading-tight text-gray-500">{subTitle}</p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        </div>
      </header>
    </div>
  );
};

export default PageHeader;
