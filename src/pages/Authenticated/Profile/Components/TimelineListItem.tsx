import React from 'react';
import moment from 'moment';

interface ITimelineListItem {
  type: 'joined' | 'award';
  time: string;
  position?: string;
  points?: number;
  contestName?: string;
  contestId?: number;
}

const TimelineListItem: React.FC<ITimelineListItem> = ({ type, time, position, points, contestId, contestName }) => {
  return (
    <li>
      <div className="relative pb-8">
        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
        <div className="relative flex space-x-3">
          <div>
            {type === 'joined' && (
              <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                <svg
                  className="h-5 w-5 text-white"
                  data-todo-x-description="Heroicon name: solid/user"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            )}
            {type === 'award' && (
              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                <svg
                  className="h-5 w-5 text-white"
                  data-todo-x-description="Heroicon name: solid/check"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            {type === 'joined' && (
              <div>
                <p className="text-sm text-gray-500">
                  Registered on{' '}
                  <a href="/" className="font-medium text-gray-900">
                    Syntasso.io
                  </a>
                </p>
              </div>
            )}
            {type === 'award' && (
              <div>
                <p className="text-sm text-gray-500">
                  Won <span className="font-medium text-gray-900 capitalize">{position}</span> Position on{` `}
                  <a href="/" className="font-medium text-gray-900">
                    {contestName}
                  </a>
                </p>
              </div>
            )}
            <div className="text-right text-sm whitespace-nowrap text-gray-500">
              <time dateTime={time}>{moment(time).format('YY/MM/DD')}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TimelineListItem;
