import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IGetContestInfo {
    contestId: number;
}

const getContestInfo = ({ contestId }: IGetContestInfo) => {
    return makeRequest({
        method: 'get',
        path: `${EndPoint.Contest}/info/${contestId}`,
        data: {},
    });
};

export default getContestInfo;
