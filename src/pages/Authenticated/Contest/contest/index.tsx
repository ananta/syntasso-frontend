import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LogoWhite from 'shared/assets/images/logo-white.png';
import Logo from 'shared/assets/images/logo-white.png';
import Section from 'components/Layout/Section';
import SectionHeader from 'components/Common/SectionHeader';
import Button from 'components/Common/Button';
import { history } from 'utils/History';
import searchChallenge from 'api/methods/searchChallenges';
import { getContestChallenges, getContestInfo } from 'api';
import NotFound from 'components/Common/NotFound';
import CustomLoader from 'components/Common/CustomLoader';
import Sidebar from './Components/Sidebar';
import Challenges from './Components/Challenges';
import Submissions from './Components/Submissions';
import Leaderboard from './Components/Leaderboard';
import Enrollments from './Components/Enrollments';

interface IContest {
  contestId: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  difficulty: string;
  authorId: string;
}

const Contest: React.FC<RouteComponentProps> = (RouteProps) => {
  const {
    location: { pathname },
  } = RouteProps;
  const {
    url,
    params: { contestId },
  } = useRouteMatch();
  const [contestInfo, setContestInfo] = useState<IContest>({
    contestId: 0,
    name: '',
    description: '',
    startTime: new Date().toString(),
    endTime: new Date().toString(),
    difficulty: '',
    authorId: '',
  });
  const AuthState = useSelector((state) => state['Auth']);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(false);
  const [isContestLoading, setIsContestLoading] = useState(true);
  const token = AuthState.data.user.token;
  const getChallengeInfo = async () => {
    const challengesRes = await getContestChallenges({
      contestId,
      token,
    });
    if (!challengesRes.isSuccess) throw new Error(challengesRes.message);
    setChallenges(challengesRes.response.challenges);
  };

  const getContestInformation = async () => {
    const contestRes = await getContestInfo({ contestId });
    if (!contestRes.response.isSuccess) throw new Error(contestRes.response.message);
    setContestInfo(contestRes.response.contest);
  };

  const initializeContest = async () => {
    try {
      setError(false);
      await getContestInformation();
      await getChallengeInfo();
      setIsContestLoading(false);
    } catch (err) {
      setError(true);
      toast.error(err.message);
      setIsContestLoading(false);
    }
  };

  useEffect(() => {
    initializeContest();
  }, []);

  if (isContestLoading) return <CustomLoader />;
  if (error) return <NotFound />;
  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <SectionHeader minified title={contestInfo.name} link="Details" />
        <div className="border border-dotted my-5"></div>
      </div>
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full flex-1 lg:w-1/3 px-3">
          <Switch>
            <Route path={`${url}/submissions`} render={(props) => <Submissions contestId={contestId} {...props} />} />
            <Route path={`${url}/leaderboard`} render={(props) => <Leaderboard contestId={contestId} {...props} />} />
            <Route path={`${url}/enrollments`} render={(props) => <Enrollments contestId={contestId} {...props} />} />
            <Route
              exact
              path={`${url}/`}
              render={(props) => <Challenges challenges={challenges} url={url} {...props} />}
            />
          </Switch>
          {/* <Challenges /> */}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Contest;
