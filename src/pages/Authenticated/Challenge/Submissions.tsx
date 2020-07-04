import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux';
import { AiFillLeftCircle } from 'react-icons/ai';
import { history } from 'utils/History';
import Validator from 'utils/Validator';
import Button from 'components/Common/Button';
import { toast } from 'react-toastify';
import LogoWhite from 'shared/assets/images/logo-white.png';

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
                        <h2 className="text-3xl text-gray-900">Submissions</h2>
                        <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
                            List of submissions made on this challenge
                        </p>
                        <form className="border-t border-gray-400 pt-8" onSubmit={handleSubmit(handleChallenge)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Info
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="w-full h-full rounded-full"
                                                            src={LogoWhite}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        {/* <Link to={`/edit/details`}> */}
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            Ananta Bastola
                                                        </p>
                                                        {/* </Link> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {JSON.stringify(new Date())}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
                                                <p className="text-gray-900 whitespace-no-wrap">{'undefined'}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
