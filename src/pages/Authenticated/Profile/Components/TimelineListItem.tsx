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
              <span
                className={
                  'text-white h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ' +
                  (position === 'first' ? ' bg-orange-400' : position === 'second' ? 'bg-gray-400' : 'bg-brown-400')
                }
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1270.000000pt"
                  height="1280.000000pt"
                  viewBox="0 0 1270.000000 1280.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
                  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                    <path
                      d="M6277 12686 c-44 -16 -83 -49 -102 -86 -7 -14 -327 -1043 -709 -2285
-383 -1243 -701 -2270 -706 -2282 l-10 -23 -2255 0 c-2227 0 -2256 0 -2295
-20 -47 -24 -76 -63 -89 -119 -15 -66 4 -125 56 -172 15 -15 831 -642 1813
-1394 982 -752 1792 -1375 1802 -1384 15 -15 14 -22 -11 -106 -16 -49 -331
-1073 -701 -2275 -460 -1495 -673 -2198 -672 -2228 0 -61 41 -125 95 -151 51
-25 116 -27 157 -6 22 12 2207 1680 3484 2661 l199 153 101 -77 c56 -43 850
-652 1766 -1353 916 -701 1700 -1301 1743 -1334 71 -53 84 -59 135 -62 68 -5
112 15 155 69 62 77 111 -101 -662 2410 -386 1253 -701 2281 -701 2285 0 4
114 94 253 200 138 106 959 734 1822 1396 1234 946 1575 1212 1592 1243 39 67
28 151 -25 208 -56 60 108 56 -2340 56 -1788 0 -2252 3 -2259 13 -5 6 -168
525 -361 1152 -985 3198 -1054 3420 -1077 3451 -43 57 -133 84 -198 60z m633
-2656 c314 -1020 600 -1949 636 -2063 70 -228 72 -232 106 -264 60 -57 -82
-53 2143 -53 l2047 0 -29 -23 c-28 -24 -2691 -2066 -3058 -2345 -267 -204
-275 -212 -277 -295 0 -30 187 -654 631 -2098 348 -1130 634 -2060 637 -2068
3 -10 1 -11 -8 -4 -7 6 -686 525 -1508 1155 -822 629 -1566 1199 -1653 1266
-87 66 -174 126 -193 132 -66 22 -114 6 -218 -73 -52 -40 -609 -466 -1238
-948 -1890 -1449 -1999 -1531 -2003 -1527 -2 2 282 930 631 2063 348 1133 634
2075 634 2092 0 61 -28 110 -94 161 -33 27 -783 602 -1665 1278 l-1604 1229
2060 5 2059 5 42 27 c23 16 48 40 56 56 8 15 292 927 631 2027 652 2117 655
2128 660 2123 2 -2 260 -838 575 -1858z"
                    />
                    <path
                      d="M6326 11279 c-3 -8 -262 -849 -576 -1869 -314 -1020 -576 -1872 -583
-1893 l-12 -38 -1899 -4 c-1044 -2 -1899 -5 -1901 -7 -3 -3 765 -592 2390
-1836 368 -282 671 -519 673 -525 2 -8 -1038 -3402 -1163 -3798 -7 -20 -4 -19
31 7 47 34 2333 1784 2753 2107 l295 226 35 -28 c71 -55 878 -673 1944 -1490
599 -458 1091 -831 1093 -828 3 3 -254 848 -571 1879 -318 1030 -581 1885
-586 1901 -7 26 -1 32 159 155 92 70 783 600 1536 1177 l1370 1050 -970 8
c-533 4 -1378 6 -1879 5 -500 -2 -920 -2 -932 0 -19 3 -28 20 -57 115 -19 62
-283 918 -586 1902 -304 985 -554 1792 -556 1794 -2 2 -6 -2 -8 -10z"
                    />
                  </g>
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
