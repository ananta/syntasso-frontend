import { searchContest } from 'api';
import searchBookmarks from 'api/methods/searchBookmarks';
import searchChallenge from 'api/methods/searchChallenges';
import NoPostYet from 'components/Common/NoPostYet';
import SectionHeader from 'components/Common/SectionHeader';
import usePaginatedList from 'hooks/usePaginatedList';
import React, { useEffect, useRef, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useHistory } from 'react-router-dom';

import DefaultImage from 'shared/assets/images/defaultPostRect.png';

interface IContestInfo {
  contest_name?: string;
  contest_description?: string;
  contest_contestId?: number;
}
interface IChallengeInfo {
  challenges_name?: string;
  challenges_description?: string;
  challenges_challengeId?: number;
}

interface IBookmarksInfo extends IContestInfo, IChallengeInfo {}

interface IContestCard {
  type: 'contests';
  contest: IContestInfo;
}
interface IChallengeCard {
  type: 'challenges';
  challenge: IChallengeInfo;
}
interface IBookmarkCard {
  type: 'bookmark_challenge' | 'bookmark_contest';
  bookmark: IBookmarksInfo;
}

const PostCard = (item: IContestCard | IChallengeCard | IBookmarkCard) => {
  const title =
    item.type === 'contests'
      ? item.contest.contest_name
      : item.type === 'challenges'
      ? item.challenge.challenges_name
      : item.bookmark.challenges_name || item.bookmark.contest_name;

  const description =
    item.type === 'contests'
      ? item.contest.contest_description
      : item.type === 'challenges'
      ? item.challenge.challenges_description
      : item.bookmark.challenges_description || item.bookmark.contest_description;
  const link =
    item.type === 'contests'
      ? `/join/${item.contest.contest_contestId}`
      : item.type === 'challenges'
      ? `/challenge/${item.challenge.challenges_challengeId}`
      : item.bookmark.challenges_challengeId
      ? `/challenge/${item.bookmark.challenges_challengeId}`
      : `/join/item.bookmark.contest_contestId`;

  return (
    <div
      className="bg-white shadow-md sm:rounded-lg rounded-lg lg:p-0 overflow-hidden ml-2 mr-2"
      style={{ width: 400 }}
    >
      <div>
        <img src={DefaultImage} alt="technology" className="object-cover h-32 w-full" draggable={false} />
      </div>
      <div className="p-2 pl-2">
        <h2 className="font-bold text-md text-gray-800 mt-2">{title}</h2>
        <p className="text-gray-700 mb-2 text-sm truncate">{description}</p>
        <div className="flex flex-end">
          <a
            href={link}
            className="inline-block py-1 rounded text-blue-900 mt-1 ml-auto capitalize text-sm bg-gray-200 py-1 px-2 "
          >
            View {(item.type === 'challenges' || item.type === 'contests') && item.type}
          </a>
        </div>
      </div>
    </div>
  );
};

const ContestCardSkeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4 ml-2 mr-2">
      <div style={{ width: 400 }}>
        <div className="animate-pulse">
          <div className="bg-gray-300  h-32 w-full" />
        </div>
        <div className="pt-2 ">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 mt-2 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

interface ILatestHorizontalPost {
  type: 'contests' | 'bookmark_challenge' | 'challenges' | 'bookmark_contest';
}

const LatestHorizontalPost: React.FC<ILatestHorizontalPost> = ({ type }) => {
  const history = useHistory();
  const { isItemsLoading, items } = usePaginatedList({
    pagination: 5,
    currentPage: 1,
    getDataApi: type === 'contests' ? searchContest : type === 'challenges' ? searchChallenge : searchBookmarks,
    type: type.includes('bookmark') ? 'bookmarks' : type,
    bookmarkType: type.includes('bookmark') && type.replace('bookmark_', ''),
    // ('bookmark') && (type.includes('contests') ? 'contests' : 'challenges')
  });

  let latestContestRef: any = useRef('');

  useEffect(() => {
    if (latestContestRef) latestContestRef.setInitial();
  }, []);
  console.log({ items });
  return (
    <div className="my-12">
      <SectionHeader
        title={
          type === 'contests'
            ? 'Latest Contests'
            : type === 'challenges'
            ? 'Latest Challenges'
            : type === 'bookmark_challenge'
            ? 'Challenge Bookmarks'
            : 'Contest Bookmarks'
        }
        ActionButton={
          <button
            onClick={() =>
              history.push(
                type === 'contests'
                  ? '/contests'
                  : type === 'challenges'
                  ? '/challenges'
                  : type === 'bookmark_challenge'
                  ? '/bookmarks?tab=challenges'
                  : '/bookmarks?tab=contests',
              )
            }
            className="bg-gray-200 hover:bg-green-200 text-gray-200 px-3 py-1 rounded cursor-pointer"
            style={{ background: '#2E3749' }}
          >
            View more
          </button>
        }
      />
      {!isItemsLoading && items.length < 1 && <NoPostYet />}
      {isItemsLoading && (
        <div className="flex space-x-4 ">
          <ContestCardSkeleton />
          <ContestCardSkeleton />
          <ContestCardSkeleton />
        </div>
      )}
      <ScrollMenu
        alignCenter={true}
        data={
          items.length > 0 &&
          items.map((item: any) => <PostCard type={type} contest={item} challenge={item} bookmark={item} />)
        }
        wheel={false}
        ref={(el: any) => (latestContestRef = el)}
      />
    </div>
  );
};

export default LatestHorizontalPost;
