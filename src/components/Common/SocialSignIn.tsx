import React from 'react';

import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { RegularText } from 'components/Common/CustomText';

const SocialSignIn = () => {
    return (
        <div className="w-full">
            <RegularText classNames="text-gray-600 text-center font-bold mt-3 h-6 uppercase">SIGN IN WITH</RegularText>
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
    );
};

export default SocialSignIn;
