import React from 'react';
import { IconType } from 'react-icons/lib';
import { MdAccountCircle } from 'react-icons/md';

interface IStatusListItem {
  Icon?: IconType;
  title?: string;
  recentActivityTime?: string;
  value?: number;
}

const StatusListItem: React.FC<IStatusListItem> = ({ Icon, recentActivityTime, title, value }) => {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {Icon ? <Icon className="h-8 w-8" /> : <MdAccountCircle className="h-8 w-8 text-gray-800" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title || 'undefined'}</p>
          <p className="text-sm text-gray-500 truncate">Recent activity:{recentActivityTime || 'undefined'}</p>
        </div>
        <div>
          <a className="inline-flex items-center shadow-sm px-2.5 py-0.5 text-lg leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50">
            {value || '0'}
          </a>
        </div>
      </div>
    </li>
  );
};

export const StatusListItemSkeleton = () => (
  <li className="py-4">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
      </div>
      <div>
        <a className="inline-flex items-center shadow-sm px-2.5 py-0.5 text-lg leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50">
          <div className="rounded-full bg-gray-200 h-4 w-4"></div>
        </a>
      </div>
    </div>
  </li>
);
export default StatusListItem;
