import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle, RegularText } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { stateToHTML } from 'draft-js-export-html';
import { stateToHTML } from 'draft-js-export-html';
import ReactHtmlParser from 'react-html-parser';
import useSocket from 'hooks/useSocket';

import AceEditor from 'components/IDE/Editor';
import Terminal from 'components/IDE/Terminal';

import challengeAction from 'actions/ChallengeActions';
import { Challenge } from 'actions/ActionTypes';
import removeChallenge from 'api/methods/removeChallenge';
import createSubmission from 'api/methods/codeSubmission';
import TestCaseViewer from './Components/TestCaseViewer';

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
}
const Problem: React.FC<ProblemInfoProps> = (ProblemInfo) => {
    const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
    const [editorCode, setEditorCode] = useState(`"use strict";

process.stdin.setEncoding("utf-8");

let rawInputString = "",
	jsonInputString = {},
	sampleInputId = "",
    sampleInputFileContents = [];
    
process.stdin.on("data", data => {
	if (data.toString().trim() !== "") rawInputString += data;
});

process.stdin.on("end", () => {
	if (rawInputString.trim() !== "") {
		jsonInputString = JSON.parse(rawInputString);
		sampleInputId = jsonInputString.sampleInputId;
		sampleInputFileContents = JSON.parse(jsonInputString.fileContents);
		// remove any empty elements from the array sampleInputFileContents
		sampleInputFileContents = sampleInputFileContents.filter(el => el.trim() !== "");
	}
	main();
});

    // write function here

const main = () => {

    // invoke function here

}`);

    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const { challenge } = ProblemInfo;
    console.log(ProblemInfo.challenge);
    const AuthState = useSelector((state) => state['Auth'].data);
    const serverUrl = 'http://localhost:8080',
        topic = 'docker-app-stdout';
    const [msgBuildLogs, msgTestLogs, isConnected, socketId] = useSocket(serverUrl);
    console.log(socketId);
    console.log(isConnected);
    console.log(msgBuildLogs);
    console.log(msgTestLogs);

    const handleCodeSubmission = async () => {
        try {
            setIsSubmissionLoading(true);
            // const challengeRemoveRes = await createSubmission({
            //     token: AuthState.user.token,
            //     challengeId,
            // });
            // if (!challengeRemoveRes.isSuccess) throw new Error(challengeRemoveRes.message);
            // dispatch(challengeAction(Challenge.Get, {}));
            const newSubmission = {
                token: AuthState.user.token.toString(),
                challengeId: Number(challenge.challengeId),
                socketId,
                code: {
                    content: editorCode,
                    language: 'javascript',
                },
            };
            // console.log(newSubmission);
            const submissionRes = await createSubmission({
                ...newSubmission,
            });

            console.log({ newSubmission });
            console.log(submissionRes);
            if (!submissionRes.isSuccess) throw new Error(submissionRes.message);
            toast.success('Submitted code to the server');
            setIsSubmissionLoading(false);
        } catch (err) {
            setIsSubmissionLoading(false);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex-1 flex items-center">
                    <div className="text-center italic">
                        Difficulty&nbsp;
                        <span className="text-pink-600 cursor-pointer underline uppercase">{challenge.difficulty}</span>
                        .
                    </div>
                </div>
            </div>
            <div className="inputs w-full p-6">
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
            <div className="border-t border-b border-gray-400 pt-8 ">
                <div>
                    <AceEditor height={30} currentCode={editorCode} setCurrentCode={setEditorCode} />
                </div>
            </div>
            <div className="pt-8 ">
                <div className="flex justify-end">
                    <div>
                        <Button
                            title="Submit Code"
                            isBusy={isSubmissionLoading}
                            disabled={isSubmissionLoading}
                            onClick={handleCodeSubmission}
                        />
                    </div>
                </div>
            </div>
            <div className="pt-8 ">
                <div className="flex justify-between">
                    <div className="flex-1">
                        <Terminal height={20} msg={msgBuildLogs} socketId={socketId} topic={topic} />
                    </div>
                    <div className="flex-1">
                        <Terminal height={20} msg={msgTestLogs} socketId={socketId} topic={topic} />
                    </div>
                </div>
            </div>
            <div className="pt-8">
                <TestCaseViewer />
            </div>
        </div>
    );
};

export default Problem;
