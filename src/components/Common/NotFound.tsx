import React from 'react';
import { history } from 'utils/History';

import Button from 'components/Common/Button';

const NotFound = () => {
    return (
        <div className="flex bg-gray-100 py-24 justify-center">
            <div className="p-12 text-center max-w-2xl">
                <div className="md:text-3xl text-3xl font-bold">Not Available :(</div>
                <div className="text-xl font-normal mt-4">
                    The content you are looking for isn{`'`}t availble for you.
                </div>
                <div className="mt-6 flex justify-center h-12 relative">
                    <div>
                        <Button title="Go Back" onClick={() => history.goBack()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
