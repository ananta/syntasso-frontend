import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SectionHeader from 'components/Common/SectionHeader';
import LatestHorizontalPost from './Components/LatestHorizontalPost';
import SidebarContainer from './Components/SidebarContainer';
import TimelineList from './Components/StatusList';
import TagsGrid from './Components/TagsGrid';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <div>
        <main className="py-4">
          <div>
            <SectionHeader title="Activity Overview" />
            <SidebarContainer
              mainContent={
                <div>
                  {/* <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                      Don't know what to put here. but yeah
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Will put something just like anime filler episodes
                    </p>
                  </div> */}

                  <TagsGrid />
                </div>
              }
              sidebarContent={<TimelineList />}
            />
          </div>
        </main>
      </div>

      <div>
        <LatestHorizontalPost type="contests" />
        <LatestHorizontalPost type="challenges" />
        <LatestHorizontalPost type="bookmark_challenge" />
        <LatestHorizontalPost type="bookmark_contest" />
      </div>
    </div>
  );
};

export default Home;
