import React from 'react';
import TextInput from 'components/Common/TextInput';
import SocialSignIn from 'components/Common/SocialSignIn';
import { TitleText, MediumTitle, RegularText } from './CustomText';
import Button from 'components/Common/Button';

import useLocalStorage from 'hooks/useLocalStorage';

const HeroWithForm = () => {
    const [isLoginSelected, setLoginSelected] = useLocalStorage('isLoginSelected', true);

    return (
        <div className="mx-auto max-w-6xl py-10">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/2 max-w-md flex flex-col justify-center sm:w-full">
                    <TitleText classNames="md:text-4xl text-white text-bold md:text-left uppercase">
                        Syntasso.io
                    </TitleText>
                    <MediumTitle classNames="md:px-0 text-center text-xl text-white mt-4 sm:text-center md:text-left">
                        The ultimate resource to prepare for coding interviews. Everything you need, in one streamlined
                        platform.
                    </MediumTitle>
                </div>
                <div className="md:w-1/2 pt-10 flex justify-center  md:justify-end w-full md:w-1/2  md:pt-0 ">
                    <div className="shadow-xl flex-auto max-w-sm p-10 pb-20 bg-white">
                        <SocialSignIn />
                        <div className="w-full border-t border-gray-400" />
                        {!isLoginSelected && (
                            <>
                                <TextInput
                                    lableClassNames="text-gray-600"
                                    isRequired
                                    lable="First Name"
                                    placeholder="First Name"
                                />
                                <TextInput
                                    lableClassNames="text-gray-600"
                                    isRequired
                                    lable="Last Name"
                                    placeholder="Last Name"
                                />
                            </>
                        )}
                        <TextInput lableClassNames="text-gray-600" isRequired lable="Email" placeholder="Email" />
                        <TextInput
                            lableClassNames="text-gray-600"
                            isRequired
                            secureTextEntry
                            lable="Password"
                            placeholder="Password"
                        />
                        <div className="mt-6 relative ">
                            <div className="w-full">
                                {isLoginSelected ? <Button title="Sign In" /> : <Button title="Register" />}
                            </div>
                        </div>
                        <div className="relative mt-20 text-gray-600 w-full text-center border-b leading-tight mt-1">
                            <span className="bg-white my-1 px-0">OR</span>
                        </div>
                        <div className="relative w-full">
                            {isLoginSelected ? (
                                <Button
                                    title="Register Here"
                                    color="gray-600"
                                    onClick={() => setLoginSelected(false)}
                                />
                            ) : (
                                <Button
                                    // isBusy
                                    title="Login Here"
                                    color="gray-600"
                                    onClick={() => setLoginSelected(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroWithForm;
