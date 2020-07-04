import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, RouteComponentProps, useParams, useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MediumTitle } from 'components/Common/CustomText';
import Submissions from './Submissions';
import Problem from './Problem';
import { getChallengeInfo } from 'api';
import { history } from 'utils/History';

interface MatchParams {
    challengeId: string;
}
type ChallengeParams = RouteComponentProps<MatchParams>;

const Challenge: React.FC<ChallengeParams> = (RouteProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState({
        challengeId: '',
        name: '',
        description: '',
        authorId: '',
        problemStatement: '',
        difficulty: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        createdAt: '',
    });
    const {
        location: { pathname },
    } = RouteProps;
    const {
        url,
        params: { challengeId },
    } = useRouteMatch();
    const Auth = useSelector((state) => state['Auth']);

    const checkIfChallengeExists = async () => {
        console.log('Checking if challenge exists');
        try {
            setIsLoading(true);
            const challengeRes = await getChallengeInfo({
                token: Auth.data.user.token,
                challengeId,
            });
            if (!challengeRes.isSuccess) throw new Error(challengeRes.message);
            if (url === pathname) {
                if (url[url.length - 1] === '/') {
                    history.push(url + 'problem');
                } else {
                    history.push(url + '/problem');
                }
            }
            setCurrentChallenge(challengeRes.response.challenge);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            history.goBack();
        }
    };

    useEffect(() => {
        checkIfChallengeExists();
    }, []);
    return (
        <div className="bg-white">
            <ul className="flex border-b bg-gray-200">
                <NavLink
                    activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
                    activeClassName={
                        'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
                    }
                    to={`${url}/problem`}
                    className="bg-gray-200  inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
                >
                    <li className="-mb-px mr-1">Problem</li>
                </NavLink>
                <NavLink
                    activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
                    activeClassName={
                        'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
                    }
                    to={`${url}/submissions`}
                    className="bg-gray-200 inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
                >
                    <li className="mr-1">Submissions</li>
                </NavLink>
            </ul>
            {currentChallenge.challengeId && (
                <div className="bg-white py-6 px-4 border-l border-b border-r">
                    <Switch>
                        <Route
                            path={`${url}/problem`}
                            render={(props) => <Problem {...props} challenge={currentChallenge} />}
                        />
                        <Route path={`${url}/submissions`} render={(props) => <Submissions {...props} />} />
                        <Route component={() => <div>NOT FOUND</div>} />
                    </Switch>
                </div>
            )}
        </div>
    );
};

export default Challenge;
