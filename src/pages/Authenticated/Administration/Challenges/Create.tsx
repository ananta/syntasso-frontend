import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux';
import { AiFillLeftCircle } from 'react-icons/ai';
import { history } from 'utils/History';
import Validator from 'utils/Validator';
import Button from 'components/Common/Button';
import { toast } from 'react-toastify';

import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';

import { MediumTitle } from 'components/Common/CustomText';
import { Challenge } from 'actions/ActionTypes';
import challengeAction from 'actions/ChallengeActions';

const Create: React.FC<RouteComponentProps> = () => {
  const [input, setInput] = useState({
    problemStatement: EditorState.createEmpty(),
    inputFormat: EditorState.createEmpty(),
    constraints: EditorState.createEmpty(),
    outputFormat: EditorState.createEmpty(),
  });
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const ChallengeState = useSelector((state: RootStateOrAny) => state.Challenge);
  const handleChange = (name, value) => {
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleChallenge = (data) => {
    let hasErrors = false;
    if (!input.problemStatement.getCurrentContent().hasText()) {
      hasErrors = true;
      toast.error('Empty Problem Statement');
    }
    if (!input.inputFormat.getCurrentContent().hasText()) {
      hasErrors = true;
      toast.error('Empty Input Format');
    }
    if (!input.constraints.getCurrentContent().hasText()) {
      hasErrors = true;
      toast.error('Empty Constraints');
    }
    if (!input.outputFormat.getCurrentContent().hasText()) {
      hasErrors = true;
      toast.error('Empty Output Format');
    }
    if (hasErrors) return;
    dispatch(
      challengeAction(Challenge.Add, {
        input: {
          name: data.name,
          description: data.description,
          problemStatement: JSON.stringify(convertToRaw(input.problemStatement.getCurrentContent())),
          constraints: JSON.stringify(convertToRaw(input.constraints.getCurrentContent())),
          sampleInput: JSON.stringify(convertToRaw(input.inputFormat.getCurrentContent())),
          sampleOutput: JSON.stringify(convertToRaw(input.outputFormat.getCurrentContent())),
        },
      }),
    );
    const _input = {
      name: data.name,
      description: data.description,
      problemStatement: convertToRaw(input.problemStatement.getCurrentContent()),
      constraints: convertToRaw(input.constraints.getCurrentContent()),
      sampleInput: convertToRaw(input.inputFormat.getCurrentContent()),
      sampleOutput: convertToRaw(input.outputFormat.getCurrentContent()),
    };
    console.log(_input);
  };

  return (
    <div>
      <div className="bg-white ">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Create Challenge</h2>
            <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
              Get started by providing the initial details needed to create a challenge.
            </p>
            <form className="border-t border-gray-400 pt-8" onSubmit={handleSubmit(handleChallenge)}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Challenge Name
                  </label>

                  <input
                    name="name"
                    ref={register({ required: true })}
                    className={classnames(
                      'flex flex-1 appearance-none block w-full bg-white text-gray-700 border shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none ',
                      errors.name ? 'focus:border-red-500 border-red-400' : 'focus:border-gray-500 border-gray-400 ',
                    )}
                    id="grid-text-1"
                    type="text"
                    // onChange={(e) => handleChange('name', e.target.value)}
                    // value={input.name}
                  />
                  {errors.name && <p className="text-red-600">&nbsp;This is required</p>}
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Description
                  </label>
                  <input
                    ref={register({ required: true })}
                    className={classnames(
                      'flex flex-1 appearance-none block w-full bg-white text-gray-700 border shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none ',
                      errors.name ? 'focus:border-red-500 border-red-400' : 'focus:border-gray-500 border-gray-400 ',
                    )}
                    id="grid-text-1"
                    type="text"
                    name="description"
                    // onChange={(e) => handleChange('description', e.target.value)}
                    // value={input.description}
                  />
                  {errors.name && <p className="text-red-600">&nbsp;This is required</p>}
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Problem Statement
                  </label>
                  <div className="flex flex-1 mb-32 md:mb-20">
                    <Editor
                      editorState={input.problemStatement}
                      editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      onEditorStateChange={(editorState) => handleChange('problemStatement', editorState)}
                    />
                  </div>
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6 ">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Input Format
                  </label>
                  <div className="flex flex-1 mb-32 md:mb-20">
                    <Editor
                      editorState={input.inputFormat}
                      editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      onEditorStateChange={(editorState) => handleChange('inputFormat', editorState)}
                    />
                  </div>
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6 ">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Constraints
                  </label>
                  <div className="flex flex-1 mb-32 md:mb-20">
                    <Editor
                      editorState={input.constraints}
                      editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      onEditorStateChange={(editorState) => handleChange('constraints', editorState)}
                    />
                  </div>
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6 ">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Output Format
                  </label>
                  <div className="flex flex-1 mb-32 md:mb-20">
                    <Editor
                      editorState={input.outputFormat}
                      editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      onEditorStateChange={(editorState) => handleChange('outputFormat', editorState)}
                    />
                  </div>
                </div>
                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                  <label
                    className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                    htmlFor="grid-text-1"
                  >
                    Tags
                  </label>
                  <input
                    ref={register({ required: true })}
                    // onChange={(e) => handleChange('tags', e.target.value)}
                    name="tags"
                    // value={input.tags}
                    className={classnames(
                      'flex flex-1 appearance-none block w-full bg-white text-gray-700 border shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none ',
                      errors.name ? 'focus:border-red-500 border-red-400' : 'focus:border-gray-500 border-gray-400 ',
                    )}
                    id="grid-text-1"
                    type="text"
                  />
                  {errors.tags && <p className="text-red-600">&nbsp;This is required</p>}
                </div>
              </div>
              <div className="justify-between flex">
                <div>
                  <Button title="Cancel" color="gray-700" onClick={() => history.goBack()} />
                </div>
                <div>
                  <Button
                    type="submit"
                    title="Save Changes"
                    onClick={() => handleSubmit(handleChallenge)}
                    disabled={ChallengeState[Challenge.Add].isBusy}
                    isBusy={ChallengeState[Challenge.Add].isBusy}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
