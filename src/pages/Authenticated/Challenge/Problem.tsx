import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router-dom';
import Button from 'components/Common/Button';
import { convertFromRaw } from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { stateToHTML } from 'draft-js-export-html';
import { stateToHTML } from 'draft-js-export-html';
import ReactHtmlParser from 'react-html-parser';

import AceEditor from 'components/IDE/Editor';
import Terminal from 'components/IDE/Terminal';

import createSubmission from 'api/methods/codeSubmission';
import useEngine from 'hooks/useEngine';
import { codeStub } from 'engine/constants';
import TestCaseStatus from './Components/TestCaseStatus';
import { getChallengeTestcase } from 'api';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ContainerStatus, { IContainerStatus } from './Components/ContainerStatus';
import { IsTimeInPast } from 'utils/TimeStatus';

interface ProblemInfoProps extends RouteComponentProps {
  challenge: {
    challengeId: string;
    name: string;
    description: string;
    authorId: string;
    problemStatement: string;
    difficulty: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
    createdAt: string;
  };
  isContestBased?: boolean;
  contestId?: number;
  contestInfo?: {
    endTime: string;
  };
}

interface ITestCaseSync {
  observedOutputTooLong: boolean;
  process: Number;
  testStatus: Boolean;
  timedOut: Boolean;
}

interface ISubmissionStreaming {
  isStreaming: boolean;
  testCases?: any[] | undefined;
}

const InitialContainerStatus = {
  status: 'idle' as IContainerStatus['status'],
  message: [],
  error: [],
};

const InitialSubmissionStreaming = {
  isStreaming: false,
  testCases: [],
};

const Problem: React.FC<ProblemInfoProps> = (ProblemInfo) => {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [containerStatus, setContainerStatus] = useState<IContainerStatus>(InitialContainerStatus);
  const [submissionStreaming, setIsSubmissionStreaming] = useState<ISubmissionStreaming>(InitialSubmissionStreaming);
  const [currentLanguage, setCurrentLanguage] = useState<'js' | 'c' | 'cpp'>('js');
  const [editorCode, setEditorCode] = useState(codeStub[currentLanguage]);
  const [postMsgUpdate, setPostMsgUpdate] = useState({});
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { challenge, contestInfo, isContestBased } = ProblemInfo;

  const AuthState = useSelector((state) => state['Auth'].data);
  // const serverUrl = 'http://localhost:8080',
  //     topic = 'docker-app-stdout';
  const [topic, msgBuildLogs, msgTestLogs, msgContainerStatus, isConnected, socketId] = useEngine(currentLanguage);

  const handleStreaming = (testCases: [any]) => {
    const formattedTestCases = testCases.map((test, index) => ({
      ...test,
      observedOutputTooLong: false,
      process: Number(index + 1),
      testStatus: false,
      timedOut: false,
      isLoading: true,
    }));
    setIsSubmissionStreaming((state) => ({
      ...state,
      isStreaming: true,
      testCases: formattedTestCases,
    }));
  };

  const handleCodeSubmission = async () => {
    try {
      setIsSubmissionLoading(true);
      if (isContestBased && IsTimeInPast(contestInfo.endTime))
        throw new Error('You cannot submit because the contest is over!');
      // set code submission = true;
      // generate  the testcases grid and wait for the socket connection to fulfull
      /// update the testcases with the testcase socket connection
      const token = AuthState.user.token.toString();
      const challengeId = challenge.challengeId;
      const testCases = await getChallengeTestcase({ challengeId, token });
      if (!(testCases.response.testcases || testCases.response.testcases.length > 0)) {
        throw new Error('Testcases unavailable for the challenge!');
      }
      handleStreaming(testCases.response.testcases);
      const newSubmission = {
        isContest: ProblemInfo.isContestBased,

        token,
        challengeId: Number(challengeId),
        socketId,
        code: {
          content: editorCode,
          language: currentLanguage,
        },
      };
      if (ProblemInfo.isContestBased) newSubmission['contestId'] = ProblemInfo.contestId;
      const submissionRes = await createSubmission({
        ...newSubmission,
      });

      if (!submissionRes.isSuccess) throw new Error(submissionRes.message);
      const toBeUpdated = submissionRes.response.submission.processes.map((process, index) => {
        return {
          ...process,
          process: index + 1,
          sampleOutput: process['expectedOutput'],
          type: 'test-status',
        };
      });
      // dispatch the result to be updated
      for (let i = 0; i < toBeUpdated.length; i++) {
        setPostMsgUpdate(toBeUpdated[i]);
      }
      toast.success('Execution completed');
      setIsSubmissionLoading(false);
    } catch (err) {
      setIsSubmissionLoading(false);
      setIsSubmissionStreaming(InitialSubmissionStreaming);
      toast.error(err.message);
    }
  };

  const handleLanguageChange = (language: 'c' | 'js' | 'cpp') => {
    setEditorCode(codeStub[language]);
    setCurrentLanguage(language);
  };

  const handleContainerStatusUpdates = (msgLog: any) => {
    if (msgLog && (msgLog.status || msgLog.message || msgLog.error)) {
      setContainerStatus((state) => ({
        ...state,
        ...msgLog,
      }));
    }
  };

  const handleTestCaseUpdates = (msgLog: any) => {
    const testCases = submissionStreaming.testCases;
    if (submissionStreaming.testCases && submissionStreaming.testCases.length > 0) {
      const updatedTestProcessId = submissionStreaming.testCases.findIndex((tst) => tst.process === msgLog.process);
      testCases[updatedTestProcessId] = {
        ...testCases[updatedTestProcessId],
        ...msgLog,
        isLoading: false,
      };
      setIsSubmissionStreaming((state) => ({
        ...state,
        testCases,
      }));
    }
  };

  useEffect(() => {
    handleTestCaseUpdates(msgTestLogs);
  }, [msgTestLogs]);

  useEffect(() => {
    handleTestCaseUpdates(postMsgUpdate);
  }, [postMsgUpdate]);

  useEffect(() => {
    handleContainerStatusUpdates(msgContainerStatus);
  }, [msgContainerStatus]);

  return (
    <div>
      <div className="bg-white shadow-xl  border-l  border-r py-4 px-4 ">
        <div className="inputs w-full px-6 my-4">
          <h2 className="text-3xl text-gray-900 -mx-3">{challenge.name}</h2>
          <form className="border-t border-gray-400 pt-8 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="md:flex w-full md:w-full  mb-6 items-center">
                <label
                  className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                  htmlFor="grid-text-1"
                >
                  Description
                </label>
                <div className="flex flex-1 appearance-none block w-full text-gray-700  rounded-md py-3 px-4 leading-tight ">
                  {challenge.description}
                </div>
              </div>
              <div className="md:flex w-full md:w-full  mb-6">
                <label
                  className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                  htmlFor="grid-text-1"
                >
                  Problem Statement
                </label>
                <div className="flex flex-1 mb-32 md:mb-2 bg-gray-200 py-8 px-4">
                  {ReactHtmlParser(stateToHTML(convertFromRaw(JSON.parse(challenge.problemStatement))))}
                </div>
              </div>
              <div className="md:flex w-full md:w-full  mb-6 ">
                <label
                  className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                  htmlFor="grid-text-1"
                >
                  Input Format
                </label>

                <div className="flex flex-1 mb-32 md:mb-2 bg-gray-200 py-8 px-4">
                  {ReactHtmlParser(stateToHTML(convertFromRaw(JSON.parse(challenge.sampleInput))))}
                </div>
              </div>
              <div className="md:flex w-full md:w-full  mb-6 ">
                <label
                  className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                  htmlFor="grid-text-1"
                >
                  Constraints
                </label>

                <div className="flex flex-1 mb-32 md:mb-2 bg-gray-200 py-8 px-4">
                  {ReactHtmlParser(stateToHTML(convertFromRaw(JSON.parse(challenge.constraints))))}
                </div>
              </div>
              <div className="md:flex w-full md:w-full  mb-6 ">
                <label
                  className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                  htmlFor="grid-text-1"
                >
                  Output Format
                </label>
                <div className="flex flex-1 mb-32 md:mb-2 bg-gray-200 py-8 px-4">
                  {ReactHtmlParser(stateToHTML(convertFromRaw(JSON.parse(challenge.sampleOutput))))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 bg-white shadow-xl border-t border-b border-gray-400 ">
        <div>
          <AceEditor
            language={currentLanguage}
            setLanguage={handleLanguageChange}
            height={50}
            currentCode={editorCode}
            errors={
              submissionStreaming.testCases.length > 0 &&
              submissionStreaming.testCases
                .filter((testCases) => !!testCases.error)
                .map((error) => ({
                  type: 'screenLine',
                  startRow: error.error.lineNumber - 1,
                  endRow: error.error.lineNumber + 2,
                  startCol: error.error.columnNumber ? error.error.columnNumber : 10,
                  endCol: 100,
                  className: 'errorMarkerTextEditor',
                }))
            }
            setCurrentCode={setEditorCode}
          />
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <ContainerStatus {...containerStatus} />
          </div>
          <div className="flex">
            <div className="shadow-xl mr-4">
              <Button flat color="purple-600" title="Debug" onClick={() => setIsDebugMode(!isDebugMode)}>
                {isDebugMode ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            </div>

            <div className="shadow-xl">
              <Button
                flat
                title="Submit Code"
                isBusy={isSubmissionLoading}
                disabled={isSubmissionLoading || containerStatus.status !== 'ready'}
                onClick={handleCodeSubmission}
              />
            </div>
          </div>
        </div>
      </div>

      {isDebugMode && (
        <div className="mt-8 bg-white shadow-xl">
          <div className="flex justify-between">
            <div className="flex-1 bg-white ">
              <Terminal height={20} msg={msgBuildLogs} socketId={socketId} topic={topic} />
            </div>
          </div>
        </div>
      )}
      {submissionStreaming.isStreaming && (
        <div className="pt-8">
          <TestCaseStatus testCases={submissionStreaming.testCases} />
        </div>
      )}
    </div>
  );
};

export default Problem;
