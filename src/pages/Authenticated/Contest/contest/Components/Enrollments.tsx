import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LogoWhite from 'shared/assets/images/logo-white.png';
import { IRoutePropsForContest } from './types';
import { IEnrolledUser } from 'constants/';
import CustomLoader from 'components/Common/CustomLoader';
import NotFound from 'components/Common/NotFound';
import { getContestEnrollments } from 'api';
import moment from 'moment';

const Enrollments: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [isEnrollmentLoading, setIsEnrollmentLoading] = useState(true);
  const [error, setError] = useState(false);
  const [enrollments, setEnrollments] = useState<IEnrolledUser[]>([]);
  const Auth = useSelector((state) => state['Auth']);
  const handleIntiation = async () => {
    try {
      setIsEnrollmentLoading(true);
      setError(false);
      const enrollmentsRes = await getContestEnrollments({
        contestId,
        token: Auth.data.user.token,
      });
      if (!enrollmentsRes.isSuccess)
        throw new Error(enrollmentsRes.message || 'Something went wrong while fetching enrollments');
      setEnrollments(enrollmentsRes.response.enrollments);
      setIsEnrollmentLoading(false);
    } catch (err) {
      setError(true);
      setIsEnrollmentLoading(false);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    handleIntiation();
  }, []);
  if (isEnrollmentLoading) return <CustomLoader />;
  if (error) return <NotFound />;
  return (
    <div>
      <div className="bg-white ">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Enrollments</h2>
            <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">Total Enrollments</p>
            <form className="border-t border-gray-400 pt-8">
              <div className=" -mx-3 mb-6">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Enrolled at
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.length > 0 ? (
                      enrollments.map((enrollment, i) => (
                        <tr key={i.toString()}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img className="w-full h-full rounded-full" src={LogoWhite} alt="" />
                              </div>
                              <div className="ml-3">
                                {/* <Link to={`/edit/details`}> */}
                                <p className="text-gray-900 whitespace-no-wrap capitalize">
                                  {enrollment.firstName + ' ' + enrollment.lastName}
                                </p>
                                {/* </Link> */}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(enrollment.enrolledAt).format('MMM DD, YYYY')}
                            </p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No one has enrolled till now</p>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollments;
