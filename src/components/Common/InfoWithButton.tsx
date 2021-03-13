import React from 'react';

import Button from 'components/Common/Button';

interface InfoWithButtonProps {
  onClick: () => void;
  title: string;
}

const InfoWithButton: React.FC<InfoWithButtonProps> = ({ onClick, children, title }) => {
  return (
    <div className="flex justify-between">
      <div className="flex-1 flex items-center">
        <div className="text-center italic">{children}</div>
      </div>
      <div className="hidden md:block items-center justify-center">
        <Button title={title} onClick={onClick} />
      </div>
    </div>
  );
};

export default InfoWithButton;
