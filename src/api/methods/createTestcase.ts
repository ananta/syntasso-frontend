import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface createTestcaseProps {
    weightage: number;
    sampleInput: string;
    sampleOutput: string;
}

interface createTestcase {
    token: string;
    testcase: createTestcaseProps;
    challengeId: string;
}

const createTestcase = ({ token, challengeId, testcase }: createTestcase) => {
    return makeRequest({
        method: 'post',
        path: EndPoint.Testcase,
        token,
        data: {
            challengeId,
            ...testcase,
        },
    });
};

export default createTestcase;
