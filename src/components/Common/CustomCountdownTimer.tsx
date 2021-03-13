import React from 'react';
import Countdown from 'react-countdown';

interface ICustomCountdownTimer {
  endTime: string;
}

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed)
    return (
      <div className="">
        <div className="block rounded-t overflow-hidden bg-white text-center ">
          <div className="bg-gray-800 text-white py-1 text-sm">Status</div>
          <div className="pt-1 border-l border-r">
            <span className="text-4xl font-bold text-gray-700">Finished</span>
          </div>
        </div>
      </div>
    );
  return (
    <>
      <div className="flex flex-row">
        <div className="block rounded-t overflow-hidden bg-white text-center w-16">
          <div className="bg-gray-800 text-white py-1 text-sm">Days</div>
          <div className="pt-1 border-l border-r">
            <span className="text-4xl font-bold text-gray-700">{days}</span>
          </div>
        </div>
        <div className="block rounded-t overflow-hidden bg-white text-center w-16 ml-2">
          <div className="bg-gray-800 text-white py-1 text-sm">Hours</div>
          <div className="pt-1 border-l border-r">
            <span className="text-4xl font-bold text-gray-700">{hours}</span>
          </div>
        </div>
        <div className="block rounded-t overflow-hidden bg-white text-center w-16 ml-2">
          <div className="bg-gray-800 text-white py-1 text-sm">Minutes</div>
          <div className="pt-1 border-l border-r">
            <span className="text-4xl font-bold text-gray-700">{minutes}</span>
          </div>
        </div>
        <div className="block rounded-t overflow-hidden bg-white text-center w-16 ml-2">
          <div className="bg-gray-800 text-white py-1 text-sm">Seconds</div>
          <div className="pt-1 border-l border-r">
            <span className="text-4xl font-bold text-gray-700">{seconds}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomCountdownTimer: React.FC<ICustomCountdownTimer> = ({ endTime }) => (
  <Countdown date={endTime} daysInHours={true} renderer={countdownRenderer} />
);

export default CustomCountdownTimer;
