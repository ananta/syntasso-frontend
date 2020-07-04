import React, { useState, useEffect, useMemo } from 'react';

import SocketClient from 'socket.io-client';

const useSocket = (serverURL: string) => {
    interface socketStateType {
        msg1?: string;
        msg2?: string;
        socketId: string;
        isConnected: boolean;
    }
    const [socketState, setSocketState] = useState<socketStateType>({
        msg1: '',
        msg2: '',
        socketId: '',
        isConnected: false,
    });

    const handleConnection = (socketId: string) => {
        setSocketState((state: object) => ({
            ...state,
            msg1: 'Connected with ' + socketId,
            socketId,
            isConnected: true,
        }));
    };

    const handleDisconnection = () => {
        setSocketState((state: object) => ({
            ...state,
            msg1: 'Disconnected from the server',
            socketId: '',
            isConnected: false,
        }));
    };

    const handleTopic1 = (data: { stdout: string }) => {
        setSocketState((state: socketStateType) => {
            const newState = Object.assign({}, state);
            newState.msg1 = data.stdout.toString();
            return newState;
        });
    };
    const handleTopic2 = (data: { process: string; testStatus: boolean }) => {
        setSocketState((state: socketStateType) => {
            const newState = Object.assign({}, state);
            newState.msg2 = data ? `For Testcase: ${data.process + 1}, status: ${data.testStatus}` : '>';
            return newState;
        });
    };
    useEffect(() => {
        const client = SocketClient.connect(serverURL);
        client.on('connect', () => {
            if (!socketState.isConnected) {
                handleConnection(client.id.toString());
            }
        });
        client.on('disconnect', handleDisconnection);
        client.on('test-status', handleTopic2);
        client.on('docker-app-stdout', handleTopic1);
    }, [serverURL]);
    const { msg1, msg2, isConnected, socketId } = socketState;
    return [msg1, msg2, isConnected, socketId];
};

export default useSocket;
