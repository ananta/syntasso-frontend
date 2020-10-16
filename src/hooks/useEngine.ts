import { useContext, useEffect, useState } from 'react';
import { Engine } from 'engine';
import useSocket from './useSocket';

const useEngine = (engineType: 'c' | 'cpp' | 'js') => {
  const engine = Engine.getInstance();
  const topic: string = engine.getTopicForStdOut();
  const [msgBuildLogs, msgTestLogs, isConnected, socketId] = useSocket(engine.getEngineLocation(engineType));
  return [topic, msgBuildLogs, msgTestLogs, isConnected, socketId];
};

export default useEngine;
