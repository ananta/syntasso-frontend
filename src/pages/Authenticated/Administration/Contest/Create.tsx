import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux';
import { history } from 'utils/History';
import Button from 'components/Common/Button';
import { toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { getInitialDateInfo } from 'utils/DateInfo';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

import { Challenge, Contest } from 'actions/ActionTypes';
import contestAction from 'actions/ContestActions';

const Create: React.FC<RouteComponentProps> = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const [input, setInput] = useState({
        startTime: getInitialDateInfo().tomorrow,
        endTime: getInitialDateInfo().dayAfterTomorrow,
    });

    const ChallengeState = useSelector((state: RootStateOrAny) => state.Challenge);
    const handleInputChange = (name, value) => {
        setInput((input) => ({
            ...input,
            [name]: value,
        }));
    };

    const handleCreateContest = (data) => {
        let hasError = false;
        if (moment(input.startTime) > moment(input.endTime)) {
            hasError = true;
            toast.error('Start Time cannot be more than End Time');
        }
        if (moment(input.startTime) < moment()) {
            hasError = true;
            toast.error('Seems like your contest started in past! Please make it a future time');
        }
        if (hasError) return;
        console.log('Creating contest with the following information');
        console.log({ input });
        console.log({ data });
        dispatch(
            contestAction(Contest.Add, {
                input: {
                    name: data.name,
                    description: data.description,
                    startTime: input.startTime,
                    endTime: input.endTime,
                },
            }),
        );
    };

    return (
        <div>
            <div className="bg-white ">
                <div className="mx-auto">
                    <div className="inputs w-full max-w-6xl p-6">
                        <h2 className="text-3xl text-gray-900">Create Contest</h2>
                        <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
                            Host your own coding contest on Syntasso.io. You can participate and compete with friends
                            from your organization or school. Select rom our libarry of over 100+ coding challenges or
                            create your own.
                        </p>
                        <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
                            Get Started by providing the initial details for your contest.
                        </p>
                        <form className="border-t border-gray-400 pt-8" onSubmit={handleSubmit(handleCreateContest)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                                    <label
                                        className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                        htmlFor="grid-text-1"
                                    >
                                        Contest Name
                                    </label>

                                    <input
                                        name="name"
                                        ref={register({ required: true })}
                                        className={classnames(
                                            'flex flex-1 appearance-none block w-full bg-white text-gray-700 border shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none ',
                                            errors.name
                                                ? 'focus:border-red-500 border-red-400'
                                                : 'focus:border-gray-500 border-gray-400 ',
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
                                        Contest Description
                                    </label>
                                    <input
                                        ref={register({ required: true })}
                                        className={classnames(
                                            'flex flex-1 appearance-none block w-full bg-white text-gray-700 border shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none ',
                                            errors.name
                                                ? 'focus:border-red-500 border-red-400'
                                                : 'focus:border-gray-500 border-gray-400 ',
                                        )}
                                        id="grid-text-1"
                                        type="text"
                                        name="description"
                                        // onChange={(e) => handleChange('description', e.target.value)}
                                        // value={input.description}
                                    />
                                    {errors.name && <p className="text-red-600">&nbsp;This is required</p>}
                                </div>

                                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                                    <label
                                        className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                        htmlFor="grid-text-1"
                                    >
                                        Start Date & Time
                                    </label>
                                    <DateTimePicker
                                        name="startTime"
                                        onChange={(date) => handleInputChange('startTime', date)}
                                        value={input.startTime}
                                    />
                                    {/* {errors.tags && <p className="text-red-600">&nbsp;This is required</p>} */}
                                </div>
                                <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                                    <label
                                        className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                        htmlFor="grid-text-1"
                                    >
                                        End Date & Time
                                    </label>
                                    <DateTimePicker
                                        name="endTime"
                                        onChange={(date) => handleInputChange('endTime', date)}
                                        value={input.endTime}
                                    />
                                    {/* {errors.tags && <p className="text-red-600">&nbsp;This is required</p>} */}
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
                                        onClick={() => handleSubmit(handleCreateContest)}
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
