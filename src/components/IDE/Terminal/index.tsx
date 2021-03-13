import React, { useEffect, useRef, useState } from 'react';
import XTerm, { Terminal } from 'react-xterm';
import ReactResizeDetector from 'react-resize-detector';
import 'xterm/css/xterm.css';

interface SocketTerminalType {
  msg: string | boolean;
  socketId: string | boolean;
  topic: string | boolean;
  height: number;
}

const SocketTerminal = ({ msg, socketId, topic, height }: SocketTerminalType) => {
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
    const shellprompt = '~/container_id$ ';
    function prompt() {
      xterm.write('\r\n' + shellprompt);
    }
    xterm.writeln('');
    xterm.writeln('--------------------------------------------------------');
    xterm.writeln('Welcome to Syntasso.io');
    xterm.writeln('You will be able to access the container report in real time.');
    xterm.writeln('--------------------------------------------------------');
    prompt();

    term.on('key', function (key, ev) {
      const printable = !ev!.altKey && !ev!.ctrlKey && !ev!.metaKey;
      if (ev!.keyCode == 13) {
        prompt();
      } else if (printable) {
        xterm.write(key);
      }
    });

    term.on('paste', function (data, ev) {
      xterm.write('You cannot paste, it is read-only');
    });
  };

  const writeInTerminal = (stdout: string) => {
    terminalRef.current?.write('\r\n' + '~/container_id$ ' + stdout);
  };

  useEffect(() => {
    if (msg.toString().length > 0) {
      writeInTerminal(msg.toString());
    }
  }, [msg]);
  const { width } = terminalSize;

  useEffect(() => {
    if (componentDidMount) {
      terminalRef.current!.resize(width / 10, height);
    }
  }, [width]);

  useEffect(() => {
    startTerminal(terminalRef.current!);
    setComponentDidMount(true);
  }, []);

  return (
    <div className="bg-white shadow-xl" style={{ position: 'relative' }}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="flex justify-start px-2 bg-gray-700">
        <div className="">
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <p className="text-white font-bold">Engine Logs</p>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black pl-2">
        <XTerm
          ref={terminalRef}
          addons={['fit', 'fullscreen', 'search']}
          style={{
            overflow: 'hidden',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
};

export default SocketTerminal;
