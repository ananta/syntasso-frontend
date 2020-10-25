import { SocketHandler } from 'engine/Socket';
import { useState, useEffect } from 'react';

interface socketStateType {
  msg1?: string;
  msg2?: string;
  msg3?: string;
  socketId: string;
  isConnected: boolean;
}
const useSocket = (serverURL: string) => {
  const socketHandler = SocketHandler.getInstance();

  const [socketState, setSocketState] = useState<socketStateType>({
    msg1: '',
    msg2: '',
    msg3: '',
    socketId: '',
    isConnected: false,
  });

  const handleConnection = (socketId: string) => {
    console.log('Connected with' + socketId);
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

  const handleTopic2 = (data: any) => {
    const allInfo = data;
    console.log({ allInfo });
    setSocketState((state: socketStateType) => {
      const newState = Object.assign({}, state);
      // newState.msg2 = data ? `For Testcase: ${data.process + 1}, status: ${data.testStatus}` : '>';
      newState.msg2 = {
        ...data,
        process: data.process + 1,
      };
      return newState;
    });
  };

  const handleTopic3 = (data: any) => {
    const containerStatus = data;
    console.log({ containerStatus });
    setSocketState((state: socketStateType) => {
      const newState = Object.assign({}, state);
      newState.msg3 = {
        ...data,
      };
      return newState;
    });
  };

  useEffect(() => {
    socketHandler.handleNewConnection(serverURL);
    const client = socketHandler.getSocketInstance();

    client.on('connect', () => {
      console.log('Connected to' + serverURL);
      // if (!socketState.isConnected) {
      handleConnection(client.id.toString());
      // }
    });
    client.on('disconnect', handleDisconnection);
    client.on('test-status', handleTopic2);
    client.on('container-init-status', handleTopic3);
    client.on('docker-app-stdout', handleTopic1);
  }, [serverURL]);
  const { msg1, msg2, msg3, isConnected, socketId } = socketState;
  return [msg1, msg2, msg3, isConnected, socketId];
};

export default useSocket;
