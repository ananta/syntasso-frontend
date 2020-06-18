import React from 'react';
import { MdError, MdCheck, MdInfo, MdClose } from 'react-icons/md';

interface OptionsProps {
    type: 'info' | 'success' | 'error';
}

interface ReactAlertProps {
    options: OptionsProps;
    message: string;
    close: () => void;
}

const typeInfo = {
    info: {
        color: 'yellow',
        iconName: <MdInfo className="fill-current text-white text-base md:text-2xl" />,
    },
    success: {
        color: 'green',
        iconName: <MdCheck className="fill-current text-white text-base md:text-2xl" />,
    },
    error: {
        color: 'red',
        iconName: <MdError className="fill-current text-white text-base md:text-2xl" />,
    },
};

const AlertTemplate: React.FC<ReactAlertProps> = ({ options, message, close }) => {
    const TypeInfo = typeInfo[options.type];

    return (
        <div className="w-full">
            <div
                className={`bg-${TypeInfo.color}-500 flex items-center text-white text-sm md:text-base font-bold px-4 py-3 relative`}
                role="alert"
            >
                {TypeInfo.iconName}
                {`  `}
                <p className="ml-2 md: ml-4">{message}</p>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3 closealertbutton">
                    <button onClick={close}>
                        <MdClose className="fill-current text-white text-base md:text-2xl" onClick={() => close()} />
                    </button>
                </span>
            </div>
        </div>
    );
};

export default AlertTemplate;
