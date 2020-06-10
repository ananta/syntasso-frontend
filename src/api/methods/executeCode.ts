import makeRequest, { Method } from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface ExecuteCodeType {
    code: string;
    socketId: string;
    dockerConfig: '0' | '1' | '2';
}

const executeCode = ({ code, socketId, dockerConfig }: ExecuteCodeType) => {
    return makeRequest({
        method: Method.Post,
        path: EndPoint.Execute,
        data: { code, socketId, dockerConfig },
    });
};

export default executeCode;
