import React from 'react';

const TestCaseViewer = () => {
    return (
        <div className="w-full max-w-6xl min-w-0 mx-auto px-6">
            <div className="flex mt-12 bg-white rounded-md shadow">
                <div className="w-64 bg-gray-100 rounded-l-md border-r border-dashed border-gray-200">
                    <div className="flex justify-center items-center h-32 text-gray-700 text-center font-semibold text-3xl italic">
                        Tests
                    </div>
                    <div className="mt-8 border-t border-gray-200">
                        <p className="block py-3 px-6 text-gray-700 font-semibold border-b border-gray-200">
                            Test Case #1
                        </p>
                        <p className="bg-gray-700 block py-3 px-6 font-semibold border-b border-gray-200 text-white">
                            Test Case #1
                        </p>
                    </div>
                    {/* <div className="mt-8 border-t border-gray-200 bg-gray-700">
                    </div> */}
                </div>
                <div className="flex-grow">
                    <div className="flex flex-col mx-20 my-10">
                        <div className="flex items-center mb-4">
                            <label className="font-semibold text-gray-700 mr-5">Expected Input</label>
                            <textarea disabled className="flex-grow border border-gray-200 rounded py-1 px-3" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="font-semibold text-gray-700 mr-5">Expected Output</label>
                            <textarea disabled className="flex-grow border border-gray-200 rounded py-1 px-3" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="font-semibold text-gray-700 mr-5">Observed Output</label>
                            <textarea disabled className="flex-grow border border-gray-200 rounded py-1 px-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCaseViewer;
