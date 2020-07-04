import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getChallengeTestcaseProps {
    token: string;
    challengeId: string;
}

const getChallenge = ({ token, challengeId }: getChallengeTestcaseProps) => {
    console.log(token);
    return makeRequest({
        method: 'get',
        path: EndPoint.Testcase + '/challenge/' + challengeId,
        token,
        data: {},
    });
};

export default getChallenge;
