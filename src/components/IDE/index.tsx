import React, { useState } from 'react';
import SplitPane, { Pane } from 'react-split-pane';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';

import { executeCode } from 'api';
import useSocket from 'hooks/useSocket';
import Terminal from './Terminal';

interface IDEProps {
  height: number;
}

const IDE: React.FC<IDEProps> = ({ height }) => {
  const [editorCode] = useState("console.log('Hello World');");
  const serverUrl = 'http://localhost:8080',
    topic = 'docker-app-stdout';

  const [msg, isConnected, socketId] = useSocket(serverUrl);
  const handleExecution = async () => {
    const executionRes = await executeCode({
      code: editorCode,
      socketId: socketId.toString(),
      dockerConfig: '0',
    });
    if (executionRes.isSuccess) {
      console.log('COMPLETED');
    }
  };

  return (
    <div className="wrapper">
      <div style={{ backgroundColor: '#0A3440', paddingLeft: 20 }}>
        <IconButton aria-label="run code" onClick={handleExecution} style={{ color: '#fff' }}>
          <PlayArrow />
        </IconButton>
        <IconButton aria-label="run code" onClick={() => false} style={{ color: '#fff' }}>
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="run code" onClick={() => false} style={{ color: '#fff' }}>
          <ShareIcon />
        </IconButton>
      </div>
      <div style={{ height: height * 17, position: 'relative' }}>
        <SplitPane split="vertical" defaultSize={'50%'} primary="first">
          <Pane>{/* <Editor height={height} currentCode={editorCode} setCurrentCode={setEditorCode} /> */}</Pane>
          <Pane>
            <Terminal height={height} msg={msg} socketId={socketId} topic={topic} />
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};

export default IDE;
