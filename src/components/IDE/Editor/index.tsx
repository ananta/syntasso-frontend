import React, { useState } from 'react';
import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

interface EditorInterface {
    currentCode: string;
    setCurrentCode: (code: string) => void;
    height: number;
}

const Editor: React.FC<EditorInterface> = ({ currentCode, setCurrentCode, height }) => {
    const [editorSize, setEditorSize] = useState({
        width: 0,
    });
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const onResize = (width: number, height: number) => {
        setEditorSize({
            width,
        });
    };
    return (
        <div style={{}}>
            <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
            <div className="flex justify-between px-8 py-2 bg-gray-700">
                <div className="text-white items-center flex">Code Editor</div>
                <div className="">
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                            <div className="relative">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        setSelectedLanguage(e.target.value);
                                    }}
                                    className="appearance-none h-full rounded-l rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                >
                                    <option value="javascript">Javascript</option>
                                    <option value="c">C</option>
                                    <option value="c++">C++</option>
                                    <option value="java">Java</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
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
                theme="tomorrow"
                name="blah2"
                onLoad={() => false}
                onChange={setCurrentCode}
                fontSize={15}
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
