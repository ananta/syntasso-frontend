import { Engine } from 'engine';
import useSocket from './useSocket';

const useEngine = (engineType: 'c' | 'cpp' | 'js') => {
  const engine = Engine.getInstance();
  const topic: string = engine.getTopicForStdOut();
  const [msgBuildLogs, msgTestLogs, msgContainerStatus, isConnected, socketId] = useSocket(
    engine.getEngineLocation(engineType),
  );
  return [topic, msgBuildLogs, msgTestLogs, msgContainerStatus, isConnected, socketId];
};

export default useEngine;
