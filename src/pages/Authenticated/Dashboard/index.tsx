import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SectionHeader from 'components/Common/SectionHeader';

import DefaultImage from 'shared/assets/images/defaultPostRect.png';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <SectionHeader title="Activity Overview" />
      <div className="flex flex-wrap mb-2 ">
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
          <div className="bg-green-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Ongoing Contests</h5>
                <h3 className="text-white text-3xl">
                  0
                  <span className="text-green-400">
                    <i className="fas fa-caret-down"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
          <div className="bg-blue-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Solved Challenges</h5>
                <h3 className="text-white text-3xl">
                  0{' '}
                  <span className="text-blue-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
          <div className="bg-orange-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right pr-1">
                <h5 className="text-white">Total Submissions</h5>
                <h3 className="text-white text-3xl">
                  0{' '}
                  <span className="text-orange-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
          <div className="bg-purple-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Server Uptime</h5>
                <h3 className="text-white text-3xl">76 days</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
          <div className="bg-red-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Total Users</h5>
                <h3 className="text-white text-3xl">0 people</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
          <div className="bg-pink-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Issues</h5>
                <h3 className="text-white text-3xl">
                  3{' '}
                  <span className="text-pink-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <SectionHeader title="Latest Contests" link="View all" />
        <div className="block space-x-0 lg:flex lg:space-x-6">
          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <div>
              <img src={DefaultImage} className="rounded" alt="technology" />
            </div>
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">ProjectEuler+</h2>
              <p className="text-gray-700 mt-2">
                Syntasso.io brings you the fun of solving Projecteuler challenges with hidden test cases and time limit.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>

          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img src={DefaultImage} className="rounded" alt="technology" />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">Hack the Interview (Asia) </h2>
              <p className="text-gray-700 mt-2">
                Join Sytasso.io&apos;s Hack the Interview coding contest to show off your skills and practice for
                interviews. The top scorers from the Asia Pacific region will have a chance to win Amazon gift cards
                worth up to $500.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>

          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img src={DefaultImage} className="rounded" alt="technology" />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">Hack the Interview (U.S.)</h2>
              <p className="text-gray-700 mt-2">
                Join Sytasso.io&apos;s Hack the Interview coding contest to show off your skills and practice for
                interviews. The top scorers from the United States region will have a chance to win Amazon gift cards
                worth up to $500.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <SectionHeader title="Bookmarked Challenges" link="View all" />
        <div className="block space-x-0 lg:flex lg:space-x-6">
          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <div>
              <img src={DefaultImage} className="rounded" alt="technology" />
            </div>
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">ProjectEuler+</h2>
              <p className="text-gray-700 mt-2">
                Syntasso.io brings you the fun of solving Projecteuler challenges with hidden test cases and time limit.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>

          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img src={DefaultImage} className="rounded" alt="technology" />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">Hack the Interview (Asia) </h2>
              <p className="text-gray-700 mt-2">
                Join Sytasso.io&apos;s Hack the Interview coding contest to show off your skills and practice for
                interviews. The top scorers from the Asia Pacific region will have a chance to win Amazon gift cards
                worth up to $500.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>
          <div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
            <img src={DefaultImage} className="rounded" alt="technology" />
            <div className="p-4 pl-0">
              <h2 className="font-bold text-2xl text-gray-800">Hack the Interview (U.S.)</h2>
              <p className="text-gray-700 mt-2">
                Join Sytasso.io&apos;s Hack the Interview coding contest to show off your skills and practice for
                interviews. The top scorers from the United States region will have a chance to win Amazon gift cards
                worth up to $500.
              </p>

              <a href="#" className="inline-block py-2 rounded text-green-900 mt-2 ml-auto">
                {' '}
                Read more{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
