import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import HireBanner from './components/HireBanner';

const Jobs: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <div>
        <div style={{ marginBottom: 20 }}>
          <HireBanner />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
