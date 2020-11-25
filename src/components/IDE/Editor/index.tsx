import React, { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

interface EditorInterface {
  currentCode: string;
  setCurrentCode: (code: string) => void;
  height: number;
  language: 'js' | 'c' | 'cpp';
  setLanguage: any | Dispatch<SetStateAction<'js' | 'c' | 'cpp'>>;
  errors?: any[];
}

const genearateMarkerAndAnnotations = (errors: any) => {
  return {
    markers: errors.map((error) => ({
      type: 'screenLine',
      startRow: error.error.lineNumber - 1,
      endRow: error.error.lineNumber + 2,
      startCol: error.error.columnNumber ? error.error.columnNumber : 10,
      endCol: 100,
      className: 'errorMarkerTextEditor',
    })),
    annotations: errors.map((error) => ({
      type: 'error',
      row: error.error.lineNumber - 1,
      text: error.error.fullError,
    })),
  };
};

const Editor: React.FC<EditorInterface> = ({ currentCode, setCurrentCode, height, language, setLanguage, errors }) => {
  const [editorSize, setEditorSize] = useState({
    width: 0,
  });
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const onResize = (width: number, height: number) => {
    setEditorSize({
      width,
    });
  };

  const formatLanguageForEditor = () => {
    if (language === 'js') setSelectedLanguage('javascript');
    if (language === 'c' || language === 'cpp') setSelectedLanguage('c_cpp');
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    formatLanguageForEditor();
  }, []);

  useEffect(() => {
    formatLanguageForEditor();
  }, [language, setLanguage]);
  console.log('Here are the errors editor is serving');
  console.log({ errors });
  const MarkersAndAnnotations = genearateMarkerAndAnnotations(errors);
  return (
    <div style={{}}>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <div className="flex justify-end px-2 bg-gray-700">
        <div className="">
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="appearance-none h-full border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value="js">Javascript</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
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
      <AceEditor
        height={(height * 17).toString() + 'px'}
        width={editorSize.width.toString() + 'px'}
        placeholder="// Please add yoeur code here"
        mode={selectedLanguage}
        theme="xcode"
        name="blah2"
        onLoad={() => false}
        onChange={setCurrentCode}
        fontSize={15}
        markers={MarkersAndAnnotations.markers}
        annotations={MarkersAndAnnotations.annotations}
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
