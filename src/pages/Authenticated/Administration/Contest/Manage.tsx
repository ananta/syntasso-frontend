import React, { useEffect } from 'react';
import { RouteComponentProps, useRouteMatch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { history } from 'utils/History';
import contestAction from 'actions/ContestActions';
import { Contest } from 'actions/ActionTypes';
import removeContest from 'api/methods/removeContest';

import Button from 'components/Common/Button';
import InfoWithButton from 'components/Common/InfoWithButton';

import LogoWhite from 'shared/assets/images/logo-white.png';

const Manage: React.FC<RouteComponentProps> = (RouteProps) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const Contests = useSelector((state) => state['Contest']);
  console.log({ Contests });
  const isBusy = Contests[Contest.Get].isBusy;
  useEffect(() => {
    dispatch(contestAction(Contest.Get, {}));
  }, []);
  const AuthState = useSelector((state) => state['Auth'].data);

  const removeContestInfo = async (contestId: string) => {
    try {
      const contestRemoveRes = await removeContest({ token: AuthState.user.token, contestId: Number(contestId) });
      if (!contestRemoveRes.isSuccess) throw new Error(contestRemoveRes.message);
      dispatch(contestAction(Contest.Get, {}));
      toast.success('Removed Challenge Successfully ');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <InfoWithButton onClick={() => history.push(url + '/create')} title="Create Contest">
        <div>
          Contests you can edit are below. For more info, visit our{' '}
          <span className="text-blue-600 underline cursor-pointer">FAQ </span>.
        </div>
      </InfoWithButton>
      <div className="md:hidden">
        <Button title="Create Contest" onClick={() => history.push(url + '/create')} />
      </div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Contests</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contest
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Settings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isBusy && <div>Loading</div>}
                  {Contests.data.map((contest, indx) => (
                    <tr key={indx.toString()}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full" src={LogoWhite} alt="" />
                          </div>
                          <div className="ml-3">
                            <Link to={`${url}/edit/${contest.contestId}/details`}>
                              <p className="text-gray-900 whitespace-no-wrap">{contest.name}</p>
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={'/contest/id/' + contest.contestId}>
                          <p className="text-gray-900 whitespace-no-wrap">{`/contest/${contest.contestId}`}</p>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                        <p className="text-gray-900 whitespace-no-wrap">{contest.difficulty || 'undefined'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p
                          className="text-red-600 whitespace-no-wrap cursor-pointer"
                          onClick={() => removeContestInfo(contest.contestId)}
                        >
                          Remove
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900"></span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
