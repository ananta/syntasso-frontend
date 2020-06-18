import React from 'react';
import classnames from 'classnames';

import { RegularText } from 'components/Common/CustomText';

interface InputProps {
    isRequired?: boolean;
    secureTextEntry?: boolean;
    lable?: string;
    lableClassNames?: string;
    classNames?: string;
}
const TextInput: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = ({
    secureTextEntry,
    classNames,
    lable,
    lableClassNames,
    isRequired,
    ...rest
}) => {
    return (
        <div className="w-full">
            {lable && (
                <>
                    <RegularText classNames={classnames('font-bold h-6 mt-3 uppercase ', lableClassNames)}>
                        {isRequired && <span className="text-red-400 mr-1">*</span>}
                        {lable}
                    </RegularText>
                </>
            )}
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                {' '}
                <input
                    {...rest}
                    type={secureTextEntry && 'password'}
                    className={classnames('p-1 px-2 appearance-none outline-none w-full text-gray-800', classNames)}
                />{' '}
            </div>
        </div>
    );
};

export default TextInput;
