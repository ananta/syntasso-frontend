import React, { useEffect, useRef, useState } from "react";
import XTerm, { Terminal } from "react-xterm";
import "xterm/css/xterm.css";
import ReactResizeDetector from "react-resize-detector";

interface SocketTerminalType {
  msg: string | boolean;
  socketId: string | boolean;
  topic: string;
  height: number;
}

const SocketTerminal = ({
  msg,
  socketId,
  topic,
  height,
}: SocketTerminalType) => {
  const terminalRef = useRef<XTerm | null>(null);
  const [terminalSize, setTerminalSize] = useState({
    width: 100,
  });
  const onResize = (width: number, height: number) => {
    setTerminalSize({
      width,
    });
  };
  const [componentDidMount, setComponentDidMount] = useState(false);
  const startTerminal = (xterm: XTerm) => {
    const term: Terminal = xterm.getTerminal();
    var shellprompt = "~/container_id$ ";
    function prompt() {
      xterm.write("\r\n" + shellprompt);
    }
    xterm.writeln("Welcome to Syntasso.io");
    xterm.writeln(
      "You will be able to access the container report in real time."
    );
    xterm.writeln("--------------------------------------------------------");
    prompt();

    term.on("key", function (key, ev) {
      var printable = !ev!!.altKey && !ev!!.ctrlKey && !ev!!.metaKey;
      if (ev!!.keyCode == 13) {
        prompt();
      } else if (printable) {
        xterm.write(key);
      }
    });

    term.on("paste", function (data, ev) {
      xterm.write("You cannot paste, it is read-only");
    });
  };

  const writeInTerminal = (stdout: string) => {
    terminalRef.current?.write("\r\n" + "~/container_id$ " + stdout);
  };

  useEffect(() => {
    if (msg.toString().length > 0) {
      writeInTerminal(msg.toString());
    }
  }, [msg]);
  const { width } = terminalSize;

  useEffect(() => {
    if (componentDidMount) {
      terminalRef.current!!.resize(width / 10, height);
    }
  }, [width]);

  useEffect(() => {
    startTerminal(terminalRef.current!!);
    setComponentDidMount(true);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <XTerm
        ref={terminalRef}
        addons={["fit", "fullscreen", "search"]}
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      />
    </div>
  );
};

export default SocketTerminal;
