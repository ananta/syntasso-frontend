import React from 'react';
import { IconType } from 'react-icons/lib';

interface IStatusListItem {
  Icon?: IconType;
  title?: string;
  recentActivityTime?: string;
  value?: string;
}

const StatusListItem: React.FC<IStatusListItem> = ({ Icon, recentActivityTime, title, value }) => {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {Icon ? (
            <Icon className="h-8 w-8" />
          ) : (
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
          )}
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

export default StatusListItem;
