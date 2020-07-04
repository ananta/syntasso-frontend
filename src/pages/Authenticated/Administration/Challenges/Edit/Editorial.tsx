import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { MediumTitle } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

interface RouteWithProps extends RouteComponentProps {
    challengeId: string;
}

const Editorial: React.FC<RouteWithProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    const [input, setInput] = useState({
        editorialContent: EditorState.createEmpty(),
    });

    const handleChange = (name, value) => {
        setInput((input) => ({
            ...input,
            [name]: value,
        }));
    };

    return (
        <div>
            <div>
                <div className="mx-auto">
                    <div className="inputs w-full p-6">
                        <h2 className="text-3xl text-gray-900 -mx-3">Manage Editorial</h2>
                        <form className="border-t border-gray-400 pt-8 ">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="md:flex w-full md:w-full  mb-6">
                                    <label
                                        className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                        htmlFor="grid-text-1"
                                    >
                                        Editoral Content
                                    </label>
                                    <div className="flex flex-1 mb-32 md:mb-20">
                                        <Editor
                                            editorState={input.editorialContent}
                                            editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                                            onEditorStateChange={(editorState) =>
                                                handleChange('editorialContent', editorState)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="justify-end flex">
                                <div>
                                    <Button title="Save Changes" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editorial;
