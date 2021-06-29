import React from 'react';

type ISidebarContainer = {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
};

const SidebarContainer: React.FC<ISidebarContainer> = ({ mainContent, sidebarContent }) => {
  return (
    <>
      <div className="mt-8  mx-auto grid grid-cols-1 gap-6  lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="applicant-information-title">{mainContent}</section>
        </div>
        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1 ">
          {sidebarContent}
        </section>
      </div>
    </>
  );
};

export default SidebarContainer;
