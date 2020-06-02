import React, { useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import axios from "axios";
import useSocket from "hooks/useSocket";

import PlayArrow from "@material-ui/icons/PlayArrow";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";

import Editor from "./Editor";
import Terminal from "./Terminal";

interface IDEProps {
  height: number;
}

const IDE: React.FC<IDEProps> = ({ height }) => {
  const [editorCode, setEditorCode] = useState(
    `const a = () => {
    console.log("Hello World");
  }`
  );
  const serverUrl = "http://localhost:8080",
    topic = "build-img-stdout";

  const [msg, isConnected, socketId] = useSocket(serverUrl, topic);

  const handleExecution = async () => {
    const res = await axios.post("http://localhost:8080/execute", {
      code: JSON.stringify(editorCode),
      socketId,
      dockerConfig: "0",
    });
  };

  return (
    <div className="wrapper">
      <div style={{ backgroundColor: "#0A3440", paddingLeft: 20 }}>
        <IconButton
          aria-label="run code"
          onClick={handleExecution}
          style={{ color: "#fff" }}
        >
          <PlayArrow />
        </IconButton>
        <IconButton
          aria-label="run code"
          onClick={() => false}
          style={{ color: "#fff" }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          aria-label="run code"
          onClick={() => false}
          style={{ color: "#fff" }}
        >
          <ShareIcon />
        </IconButton>
      </div>
      <div style={{ height: height * 17, position: "relative" }}>
        <SplitPane split="vertical" defaultSize={"50%"} primary="first">
          <Pane>
            <Editor
              height={height}
              currentCode={editorCode}
              setCurrentCode={setEditorCode}
            />
          </Pane>
          <Pane>
            <Terminal
              height={height}
              msg={msg}
              socketId={socketId}
              topic={topic}
            />
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};

export default IDE;
