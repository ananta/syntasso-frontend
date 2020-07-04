import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import Modal from 'react-modal';
import { history } from 'utils/History';
import InfoWithButton from 'components/Common/InfoWithButton';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        width: '70%',
        left: '15%',
        top: '10%',
        height: '80%',
    },
};

const Testcase: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <InfoWithButton onClick={() => openModal()} title="Create Testcase">
                <div>
                    You must add at least one test case.{' '}
                    <span className="text-blue-600 underline cursor-pointer">FAQ </span>.
                </div>
            </InfoWithButton>
            <div>
                <div className="py-8 w-full">
                    <div className="shadow overflow-hidden rounded border-b border-gray-200">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-700 text-white">
                                <tr>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                        Points
                                    </th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Info</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Updates</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr>
                                    <td className="w-1/3 text-left py-3 px-4">Test #1</td>
                                    <td className="w-1/3 text-left py-3 px-4">10</td>
                                    <td className="text-left py-3 px-4">
                                        <a className="hover:text-blue-500" href="tel:622322662">
                                            View
                                        </a>
                                    </td>
                                    <td className="text-left py-3 px-4">
                                        <a className="hover:text-red-500 text-red-600 ">Remove</a>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="w-1/3 text-left py-3 px-4">Test #2</td>
                                    <td className="w-1/3 text-left py-3 px-4">15</td>
                                    <td className="text-left py-3 px-4">
                                        <a className="hover:text-blue-500" href="tel:622322662">
                                            View
                                        </a>
                                    </td>
                                    <td className="text-left py-3 px-4">
                                        <a className="hover:text-red-500 text-red-600 ">Remove</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Example Modal"
            >
                <div className="modal-content py-4 text-left px-6 w-full">
                    <div className="flex justify-between items-center pb-3 w-full">
                        <p className="text-2xl font-bold">Add Test Case</p>
                        <div className="modal-close cursor-pointer z-50">
                            <svg
                                onClick={closeModal}
                                className="fill-current text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="my-5 ">
                        <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                            <label
                                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                htmlFor="grid-text-1"
                            >
                                Testcase Name
                            </label>
                            <input
                                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                                id="grid-text-1"
                                type="text"
                                required
                                onChange={(e) => false}
                                // value={input.name}
                            />
                        </div>
                        <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
                            <label
                                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                htmlFor="grid-text-1"
                            >
                                Testcase Points
                            </label>
                            <input
                                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                                id="grid-text-1"
                                type="text"
                                required
                                onChange={(e) => false}
                                // value={input.name}
                            />
                        </div>
                        <div className="md:flex w-full md:w-full px-3 mb-6 ">
                            <label
                                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                htmlFor="grid-text-1"
                            >
                                Input:
                            </label>
                            <textarea
                                rows={8}
                                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                                required
                                onChange={(e) => false}
                                // value={input.name}
                            />
                        </div>
                        <div className="md:flex w-full md:w-full px-3 mb-6 ">
                            <label
                                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                                htmlFor="grid-text-1"
                            >
                                Output:
                            </label>
                            <textarea
                                rows={8}
                                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                                required
                                onChange={(e) => false}
                                // value={input.name}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between pt-2">
                        <div>
                            <Button title="Cancel" color="gray-700" onClick={() => closeModal()} />
                        </div>
                        <div>
                            <Button title="Confirm" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Testcase;
