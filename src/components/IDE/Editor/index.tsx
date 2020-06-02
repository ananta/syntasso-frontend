import React, { useState } from "react";
import AceEditor from "react-ace";
import ReactResizeDetector from "react-resize-detector";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

interface EditorInterface {
  currentCode: string;
  setCurrentCode: (code: string) => void;
  height: number;
}
const Editor: React.FC<EditorInterface> = ({
  currentCode,
  setCurrentCode,
  height,
}) => {
  const [editorSize, setEditorSize] = useState({
    width: 0,
  });

  const onResize = (width: number, height: number) => {
    setEditorSize({
      width,
    });
  };

  return (
    <div style={{}}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <AceEditor
        // height={"300px"}
        height={(height * 17).toString() + "px"}
        width={editorSize.width.toString() + "px"}
        placeholder="// Please add yoeur code here"
        mode="javascript"
        theme="xcode"
        name="blah2"
        onLoad={() => false}
        onChange={setCurrentCode}
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={currentCode}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          animatedScroll: true,
        }}
      />
    </div>
  );
};

export default Editor;
