import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Loader from 'react-loader-spinner';

import { isUserAuthorizedToChallenge, updateChallenge } from 'api';
import challengeAction from 'actions/ChallengeActions';
import { Challenge } from 'actions/ActionTypes';

import Button from 'components/Common/Button';

interface EditPageProps extends RouteProps {
  challengeId: string;
}

const Details: React.FC<EditPageProps> = (EditPageProps) => {
  const { challengeId } = EditPageProps;
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isDetailsUpdating, setIsDetailsUpdating] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    description: '',
    tags: '',
    difficulty: '',
    problemStatement: EditorState.createEmpty(),
    inputFormat: EditorState.createEmpty(),
    constraints: EditorState.createEmpty(),
    outputFormat: EditorState.createEmpty(),
  });
  const [info, setInfo] = useState({
    name: '',
  });
  const AuthState = useSelector((state) => state['Auth'].data);

  const getChallengeDetails = async () => {
    const {
      response: {
        challenge: { constraints, description, difficulty, name, problemStatement, sampleInput, sampleOutput },
      },
    } = await isUserAuthorizedToChallenge({
      token: AuthState.user.token,
      challengeId,
    });
    setInfo((state) => ({
      ...state,
      name,
    }));
    setInput((state) => ({
      ...state,
      name,
      description,
      difficulty,
      problemStatement:
        EditorState.createWithContent(convertFromRaw(JSON.parse(problemStatement)), null) || EditorState.createEmpty(),
      inputFormat:
        EditorState.createWithContent(convertFromRaw(JSON.parse(sampleInput)), null) || EditorState.createEmpty(),
      constraints:
        EditorState.createWithContent(convertFromRaw(JSON.parse(constraints)), null) || EditorState.createEmpty(),
      outputFormat:
        EditorState.createWithContent(convertFromRaw(JSON.parse(sampleOutput)), null) || EditorState.createEmpty(),
    }));
  };

  const updateChallengeInfo = async () => {
    try {
      setIsDetailsUpdating(true);
      const updateRes = await updateChallenge({
        token: AuthState.user.token,
        challengeId,
        challenge: {
          name: input.name,
          description: input.description,
          difficulty: input.difficulty,
          problemStatement: JSON.stringify(convertToRaw(input.problemStatement.getCurrentContent())),
          sampleInput: JSON.stringify(convertToRaw(input.inputFormat.getCurrentContent())),
          constraints: JSON.stringify(convertToRaw(input.constraints.getCurrentContent())),
          sampleOutput: JSON.stringify(convertToRaw(input.outputFormat.getCurrentContent())),
        },
      });
      if (!updateRes.isSuccess) throw new Error(updateRes.message);
      const {
        response: {
          challenge: { constraints, description, difficulty, name, problemStatement, sampleInput, sampleOutput },
        },
      } = updateRes;

      setInfo((state) => ({
        ...state,
        name,
      }));
      setInput((state) => ({
        ...state,
        name,
        description,
        difficulty,
        problemStatement:
          EditorState.createWithContent(convertFromRaw(JSON.parse(problemStatement)), null) ||
          EditorState.createEmpty(),
        inputFormat:
          EditorState.createWithContent(convertFromRaw(JSON.parse(sampleInput)), null) || EditorState.createEmpty(),
        constraints:
          EditorState.createWithContent(convertFromRaw(JSON.parse(constraints)), null) || EditorState.createEmpty(),
        outputFormat:
          EditorState.createWithContent(convertFromRaw(JSON.parse(sampleOutput)), null) || EditorState.createEmpty(),
      }));
      toast.success('Updated Challenge Information');
      dispatch(challengeAction(Challenge.Get, {}));
      window.scrollTo(0, 0);
      setIsDetailsUpdating(false);
    } catch (err) {
      setIsDetailsUpdating(false);
      toast.error(err.message);
    }
  };

  const loadInitialChallengeInfo = async () => {
    setIsDetailsLoading(true);
    await getChallengeDetails();
    setIsDetailsLoading(false);
  };

  useEffect(() => {
    loadInitialChallengeInfo();
  }, []);

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
          {isDetailsLoading ? (
            <div className="inputs w-full p-6">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader type="Bars" color="#d53f8c" height={60} width={60} />
              </div>
            </div>
          ) : (
            <div className="inputs w-full p-6">
              <h2 className="text-3xl text-gray-900 -mx-3">{info.name}</h2>
              <form className="border-t border-gray-400 pt-8 ">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="md:flex w-full md:w-full  mb-6 items-center">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Challenge Difficulty
                    </label>
                    <div className="relative">
                      <select
                        value={input.difficulty}
                        onChange={(e) => handleChange('difficulty', e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-400 shadow-inner rounded-md text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:focus:outline-none focus:border-gray-500"
                        id="grid-state"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                      <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-1 appearance-none block w-full" />
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 items-center">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Challenge Name
                    </label>
                    <input
                      className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      required
                      onChange={(e) => handleChange('name', e.target.value)}
                      value={input.name}
                    />
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 items-center">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Description
                    </label>
                    <input
                      className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      onChange={(e) => handleChange('description', e.target.value)}
                      value={input.description}
                      required
                    />
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Problem Statement
                    </label>
                    <div className="flex flex-1 mb-32 md:mb-20 h-40">
                      <Editor
                        editorState={input.problemStatement}
                        editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 "
                        onEditorStateChange={(editorState) => handleChange('problemStatement', editorState)}
                      />
                    </div>
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 ">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Input Format
                    </label>
                    <div className="flex flex-1 mb-32 md:mb-20 h-40">
                      <Editor
                        editorState={input.inputFormat}
                        editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        onEditorStateChange={(editorState) => handleChange('inputFormat', editorState)}
                      />
                    </div>
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 ">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Constraints
                    </label>
                    <div className="flex flex-1 mb-32 md:mb-20 h-40">
                      <Editor
                        editorState={input.constraints}
                        editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        onEditorStateChange={(editorState) => handleChange('constraints', editorState)}
                      />
                    </div>
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 ">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Output Format
                    </label>
                    <div className="flex flex-1 mb-32 md:mb-20 h-40">
                      <Editor
                        editorState={input.outputFormat}
                        editorClassName="block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        onEditorStateChange={(editorState) => handleChange('outputFormat', editorState)}
                      />
                    </div>
                  </div>
                  <div className="md:flex w-full md:w-full  mb-6 items-center">
                    <label
                      className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                      htmlFor="grid-text-1"
                    >
                      Tags
                    </label>
                    <input
                      onChange={(e) => handleChange('tags', e.target.value)}
                      value={input.tags}
                      className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="justify-between flex">
                  <div>
                    <Button title="Cancel" color="gray-700" disabled={isDetailsLoading || isDetailsUpdating} />
                  </div>
                  <div>
                    <Button
                      title="Save Changes"
                      onClick={updateChallengeInfo}
                      isBusy={isDetailsLoading || isDetailsUpdating}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
