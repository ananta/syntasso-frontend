import React from 'react';
import classnames from 'classnames';
import Loader from 'react-loader-spinner';

import { RegularText } from 'components/Common/CustomText';

interface ButtonProps {
    title: string;
    isBusy?: boolean;
    classNames?: string;
    color?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
    title,
    isBusy,
    classNames,
    onClick,
    color,
}) => {
    return (
        <button
            disabled={isBusy}
            className={classnames(
                `outline-none focus:outline-none focus:shadow-outline shadow-md font-medium py-2 px-4 text-red-100  cursor-pointer bg-${
                    color ? color : 'pink-600'
                }  rounded text-lg tr-mt  absolute text-center w-full`,
                classNames,
            )}
            onClick={onClick}
        >
            {isBusy ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader type="TailSpin" color="#FFF" height={25} width={25} />
                </div>
            ) : (
                <RegularText classNames="text-gray-100 font-bold text-center md:text-base uppercase">
                    {title}
                </RegularText>
            )}
        </button>
    );
};

export default Button;
