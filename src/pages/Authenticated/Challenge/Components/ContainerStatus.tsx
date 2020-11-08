import React from 'react';

export interface IContainerStatus {
  status: 'idle' | 'building' | 'creating' | 'starting' | 'ready' | 'error';
  message?: string[];
  error?: string[];
}

const ContainerStatus: React.FC<IContainerStatus> = ({ status, message, error }) => {
  const indicatorColor = {
    idle: 'bg-gray-600',
    building: 'bg-blue-600',
    creating: 'bg-purple-600',
    starting: 'bg-yellow-600',
    ready: 'bg-green-600',
    error: 'bg-red-600',
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className={`rounded-full h-5 w-5 flex items-center justify-center ${indicatorColor[status]}`}></div>
        <p>&nbsp;</p>
        {status && status.toUpperCase()}
      </div>
      {/* {message && message.length > 1 && <p>{message}</p>} */}
      {error && error.length > 1 && error.map((msg, indx) => <p key={indx.toString()}>{msg}</p>)}
    </div>
  );
};

export default ContainerStatus;
