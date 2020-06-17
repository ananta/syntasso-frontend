import React from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaGit } from 'react-icons/fa';

const HeroWithForm = () => {
    return (
        <div className="mx-auto max-w-6xl py-10">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 max-w-md flex flex-col justify-center sm:w-full">
                    <div className="text-center md:text-4xl text-xl font-black uppercase md:text-left">Syntasso.io</div>
                    <div className="text-center text-xl mt-4 sm:text-center md:text-left">
                        The ultimate resource to prepare for coding interviews. Everything you need, in one streamlined
                        platform.
                    </div>
                </div>
                <div className="md:w-1/2 pt-10 flex justify-center  md:justify-end w-full md:w-1/2  md:pt-0 ">
                    <div className="shadow-xl flex-auto max-w-sm p-10 pb-20 bg-white">
                        <div className="w-full">
                            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase text-center">
                                Sign in with
                            </div>
                            <div className="flex justify-center my-5">
                                <div className="flex justify-between">
                                    <FaFacebook
                                        className="fill-current text-gray-600 ml-10 hover:text-pink-600 cursor-pointer"
                                        size={30}
                                    />
                                    <FaGithub
                                        className="fill-current text-gray-600 mx-10 hover:text-pink-600 cursor-pointer"
                                        size={30}
                                    />
                                    <FaGoogle
                                        className="fill-current text-gray-600 mr-10 hover:text-pink-600 cursor-pointer"
                                        size={30}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full border-t border-gray-400">
                            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                                <span className="text-red-400 mr-1">*</span> Email
                            </div>
                            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                                {' '}
                                <input
                                    placeholder="jhon@doe.com"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                />{' '}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                                <span className="text-red-400 mr-1">*</span> Password
                            </div>
                            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                                {' '}
                                <input
                                    placeholder="*********"
                                    type="password"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                />{' '}
                            </div>
                        </div>
                        <div className="mt-6 relative ">
                            <button
                                className="shadow-md font-medium py-2 px-4 text-red-100
                          cursor-pointer bg-pink-600 rounded text-lg tr-mt  absolute text-center w-full"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="relative mt-20 text-gray-600 w-full text-center border-b leading-tight mt-1">
                            <span className="bg-white py-2 px-0">OR</span>
                        </div>
                        <div className="w-full">
                            <div className="font-bold h-6 mt-3 text-pink-600 text-xs leading-8 uppercase text-center">
                                Sign up here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroWithForm;
