import React, { useState, useEffect } from 'react';
import { useRouteMatch, RouteProps, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import Button from 'components/Common/Button';

import { history } from 'utils/History';

import InfoWithButton from 'components/Common/InfoWithButton';
import AddChallengeModal from './components/AddChallengeModal';
import LogoWhite from 'shared/assets/images/logo-white.png';
import { getContestChallenges } from 'api';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        position: 'absolute',
        top: '10%',
        left: '30%',
        right: '30%',
        bottom: '0px',
        width: '700px',
        height: '260px',
    },
};
interface ContestChallengeProps extends RouteProps {
    contestId: string;
}

interface ChallengeProps {
    challengeId: number;
    name: string;
    authorId: string;
    difficulty: string;
}
const Challenges: React.FC<ContestChallengeProps> = ({ contestId }) => {
    const { url } = useRouteMatch();
    const AuthState = useSelector((state) => state['Auth']);
    const [isChallengesLoading, setIsChallengesLoading] = useState(false);
    const [challenges, setChallenges] = useState<[ChallengeProps] | null>(null);
    const [modalIsOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState({
        challengeName: '',
    });

    const handleGetContestChallenges = async () => {
        try {
            console.log('Getting contest challenges');
            setIsChallengesLoading(true);
            const contestChallengesResponse = await getContestChallenges({
                token: AuthState.data.user.token,
                contestId: parseInt(contestId),
            });
            console.log(contestChallengesResponse.response.challenges);
            setChallenges(contestChallengesResponse.response.challenges);
            console.log({ challenges });
            setIsChallengesLoading(false);
        } catch (err) {
            toast.error(err.message);
            setIsChallengesLoading(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        handleGetContestChallenges();
    }, []);
    useEffect(() => {
        if (!modalIsOpen) {
            handleGetContestChallenges();
        }
    }, [modalIsOpen]);
    console.log({ challenges });
    return (
        <div>
            <div>
                <div>
                    <div className="mx-auto">
                        {/* {isDetailsLoading ? (
                            <div className="inputs w-full p-6">
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Loader type="Bars" color="#d53f8c" height={60} width={60} />
                                </div>
                            </div>
                        ) : ( */}
                        <div className="inputs w-full p-6">
                            <InfoWithButton onClick={handleOpenModal} title="Add Challenge">
                                <div>
                                    Add challenges to your contest by selecting challenges from our library or create
                                    and add your own challenges here.
                                </div>
                            </InfoWithButton>
                        </div>

                        <div className="md:hidden">
                            <Button title="Create Challenge" onClick={() => history.push(url + '/create')} />
                        </div>
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="py-8">
                                <div className="my-2 flex sm:flex-row flex-col">
                                    <div className="flex flex-row mb-1 sm:mb-0">
                                        <div className="relative">
                                            <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option>5</option>
                                                <option>10</option>
                                                <option>20</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
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
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
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
                                                        Challenge
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
                                                {isChallengesLoading ? (
                                                    <div className="inputs w-full p-6">
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Loader
                                                                type="Bars"
                                                                color="#d53f8c"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {challenges && challenges.length > 0 ? (
                                                            challenges.map((challenge, indx) => (
                                                                <tr key={indx.toString()}>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <div className="flex items-center">
                                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                                <img
                                                                                    className="w-full h-full rounded-full"
                                                                                    src={LogoWhite}
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3">
                                                                                <Link
                                                                                    to={`${url}/edit/${challenge.challengeId}/details`}
                                                                                >
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                        {challenge.name}
                                                                                    </p>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <Link
                                                                            to={'/challenge/' + challenge.challengeId}
                                                                        >
                                                                            <p className="text-gray-900 whitespace-no-wrap">{`/challenge/${challenge.challengeId}`}</p>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {challenge.difficulty || 'undefined'}
                                                                        </p>
                                                                    </td>
                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                        <p
                                                                            className="text-red-600 whitespace-no-wrap cursor-pointer"
                                                                            // onClick={alert('removing challenges')}
                                                                        >
                                                                            Remove
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <p>Items not founds</p>
                                                        )}
                                                    </>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Add challenges"
            >
                <AddChallengeModal contestId={contestId} handleCloseModal={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default Challenges;
