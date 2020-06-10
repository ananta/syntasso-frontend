import { atom } from 'recoil';

const SocketInfo = atom({
    key: 'socketInfo',
    default: {
        socketId: '',
        isConnected: false,
    },
});

export default SocketInfo;
