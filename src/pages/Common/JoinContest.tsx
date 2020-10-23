import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouteMatch } from 'react-router-dom';
import { enrollTheUser, getContestInfo } from 'api';
import CustomLoader from 'components/Common/CustomLoader';
import { useSelector } from 'react-redux';
import NotFound from 'components/Common/NotFound';
import { toast } from 'react-toastify';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

import { isUserEnrolled } from 'api';

interface IContestInfo {
  contestId: number;
  name: string;
  description: string;
  authorId: string;
  difficulty: string;
  startTime: string;
  endTime: string;
}

const Contest = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const {
    url,
    params: { contestId },
  } = useRouteMatch();
  const [contestInfo, setContestInfo] = useState<IContestInfo>({
    contestId: 0,
    name: '',
    description: '',
    authorId: '',
    difficulty: '',
    startTime: '',
    endTime: '',
  });
  const AuthState = useSelector((state) => state['Auth']);
  const token = AuthState.data.user.token;
  const [error, setError] = useState(false);
  // show the page loader
  // if the contest exist
  // if the user has joined the contest navigate to the contest home page
  // else enroll the user and navigate to the contest page
  // if the contest doesn't exits show the respected user interface
  const checkIfUserIsEnrolledInContest = async () => {
    const isUserEnrolledRes = await isUserEnrolled({
      token,
      contestId,
    });
    if (isUserEnrolledRes.response.isEnrolled) {
      setEnrolled(true);
    } else {
      setEnrolled(false);
    }
  };

  const handleContestNavigation = () => {
    history.push(`/contest/${contestId}`);
  };
  const enrollUserInContest = async () => {
    if (!token) throw new Error('Please Login to enroll in contest!');
    const enrollUserResponse = await enrollTheUser({
      token,
      contestId,
    });
    if (!enrollUserResponse.isSuccess) throw new Error(enrollUserResponse.message || 'Something went wrong');
  };

  const initializeContestInfo = async () => {
    const contestInfoResponse = await getContestInfo({
      contestId,
    });
    if (!contestInfoResponse.isSuccess) throw new Error(contestInfoResponse.message || 'Something went wrong');
    return contestInfoResponse.response.contest;
  };

  const handleInitiation = async () => {
    try {
      setError(false);
      setIsPageLoading(true);
      await checkIfUserIsEnrolledInContest();
      const contestInfoRes = await initializeContestInfo();
      setContestInfo((contestInfo) => ({
        ...contestInfo,
        ...contestInfoRes,
      }));
      setIsPageLoading(false);
    } catch (err) {
      setError(true);
      toast.error(err.message);
      setIsPageLoading(false);
    }
  };

  const handleEnrollment = async () => {
    try {
      setIsEnrolling(true);
      await enrollUserInContest();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('User enrolled successfully');
      handleContestNavigation();
      setIsEnrolling(false);
    } catch (err) {
      toast.error(err.message);
      setIsEnrolling(false);
    }
  };

  useEffect(() => {
    handleInitiation();
  }, []);
  if (error) return <NotFound />;
  if (isPageLoading) return <CustomLoader />;
  return (
    <>
      <div className="relative bg-gray-800" style={{ height: '25rem' }}>
        <div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6875F5&blend-mode=multiply"
            alt="Support team"
          />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <div className="text-base leading-6 font-semibold uppercase tracking-wider text-gray-300">
              {enrolled ? (
                <>You have already enrolled in the contest</>
              ) : (
                <>
                  {moment(contestInfo.startTime).format('MMM DD YYYY, hh:mm A')}
                  {` `} NPT
                </>
              )}
            </div>
            <h2 className="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
              {contestInfo.name}
            </h2>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Button
                  onClick={enrolled ? handleContestNavigation : handleEnrollment}
                  isBusy={isEnrolling}
                  disabled={isEnrolling}
                  classNames="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-gray-900 bg-white hover:text-gray-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  title={enrolled ? 'Go to contest page' : 'Signup for the contest'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              About
            </h3>
            <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">{contestInfo.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 overflow-hidden">
        <div className="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern id="svg-pattern-squares-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#svg-pattern-squares-1)" />
          </svg>

          <div className="relative lg:grid lg:grid-cols-2 lg:col-gap-8">
            <div className="mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0">
              <div>
                <div className="flex items-center justify-center m-auto  h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900 text-center">Start Time</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500 text-center">
                    {moment(contestInfo.startTime).format('MMM DD YYYY, hh:mm A')}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center m-auto  h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900 text-center">End Time</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500 text-center">
                    {moment(contestInfo.endTime).format('MMM DD YYYY, hh:mm A')}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center m-auto  h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900 text-center">Difficulty</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500 text-center">{contestInfo.difficulty}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center m-auto  h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="mt-5">
                  <h5 className="text-lg leading-6 font-medium text-gray-900 text-center">Participants</h5>
                  <p className="mt-2 text-base leading-6 text-gray-500 text-center">--</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Rules
            </h3>
            <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
              accusamus quisquam. Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum
              cupiditate veritatis in accusamus quisquam. Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.oLorem ipsum dolor sit amet consect
              adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam. Lorem ipsum dolor
              sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
              accusamus quisquam.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contest;
