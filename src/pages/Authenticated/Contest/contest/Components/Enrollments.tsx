import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getContestEnrollments } from 'api';

import CustomLoader from 'components/Common/CustomLoader';
import NotFound from 'components/Common/NotFound';

import LogoWhite from 'shared/assets/images/logo-white.png';
import { IRoutePropsForContest } from './types';
import { IEnrolledUser } from 'constants/';
import ContestContainer from './ContestContainer';
import TimeAgoGenerator from 'utils/TimeAgoGenerator';

interface ILeaderboardItem {
  username: string;
  email: string;
  enrolled: string;
}

const ListItem: React.FC<ILeaderboardItem> = ({ username, email, enrolled }) => (
  <tr
    className="table-row cursor-pointer transition duration-500 ease-in-out  hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-20"
    onClick={() => window.open(`/profile/${username}`, '_blank')}
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{username}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{TimeAgoGenerator({ time: enrolled })} ago</td>
  </tr>
);

const Enrollments: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [isEnrollmentLoading, setIsEnrollmentLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollments, setEnrollments] = useState<IEnrolledUser[]>([]);
  const Auth = useSelector((state) => state['Auth']);
  const handleIntiation = async () => {
    try {
      setIsEnrollmentLoading(true);
      setError('');
      const enrollmentsRes = await getContestEnrollments({
        contestId,
        token: Auth.data.user.token,
      });
      if (!enrollmentsRes.isSuccess)
        throw new Error(enrollmentsRes.message || 'Something went wrong while fetching enrollments');
      setEnrollments(enrollmentsRes.response.enrollments);
      setIsEnrollmentLoading(false);
    } catch (err) {
      setError(err.message);
      setIsEnrollmentLoading(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    handleIntiation();
  }, []);

  if (error) return <NotFound />;
  return (
    <ContestContainer error={error} loading={isEnrollmentLoading} title="Enrollment" subTitle="Enrolled users">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Enrolled
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment, i) => (
                      <ListItem
                        username={enrollment['username']}
                        email={enrollment['email']}
                        enrolled={enrollment['enrolledAt']}
                      />
                    ))
                  ) : (
                    <p>Empty at the moment :)</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ContestContainer>
  );
};

export default Enrollments;
