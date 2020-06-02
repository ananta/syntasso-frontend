import React, { useState, useEffect, useMemo } from "react";

import SocketClient from "socket.io-client";

const useSocket = (serverURL: string, topic: string) => {
  interface socketStateType {
    msg: string;
    socketId: string;
    isConnected: boolean;
  }
  const [socketState, setSocketState] = useState<socketStateType>({
    msg: "",
    socketId: "",
    isConnected: false,
  });

  const handleConnection = (socketId: string) => {
    setSocketState((state: object) => ({
      ...state,
      msg: "Connected with " + socketId,
      socketId,
      isConnected: true,
    }));
  };

  const handleDisconnection = () => {
    setSocketState((state: object) => ({
      ...state,
      msg: "Disconnected from the server",
      socketId: "",
      isConnected: false,
    }));
  };

  const handleTopic = (data: { stdout: string }) => {
    setSocketState((state: socketStateType) => {
      const newState = Object.assign({}, state);
      newState.msg = data.stdout.toString();
      return newState;
    });
  };

  useEffect(() => {
    const client = SocketClient.connect(serverURL);
    client.on("connect", () => {
      if (!socketState.isConnected) {
        handleConnection(client.id.toString());
      }
    });
    client.on("disconnect", handleDisconnection);
    client.on(topic, handleTopic);
  }, [serverURL, topic]);
  const { msg, isConnected, socketId } = socketState;
  return [msg, isConnected, socketId];
};

export default useSocket;
