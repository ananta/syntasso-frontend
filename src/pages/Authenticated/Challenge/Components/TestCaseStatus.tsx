import React from 'react';
import Loader from 'react-loader-spinner';
import Popup from 'reactjs-popup';

import TestCaseModal from './TestCaseModal';

import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';

interface ITestCaseItem {
  title: string;
  timedOut: boolean;
  challengeId: number;
  isLoading: boolean;
  testStatus: boolean;
  observedOutputTooLong: boolean;
  sampleInput: string;
  sampleOutput: string;
  testcaseId: number;
  observedOutput?: string;
  error?: {
    lineNumber: number;
    fullError: string;
  };
  weightage: number;
  // status: 'success' | 'busy' | 'failed';
}
interface IItem {
  test: ITestCaseItem;
  key: number;
}

const TestCaseItem: React.FC<IItem> = ({ test, key }) => {
  const { title, isLoading, testStatus, observedOutputTooLong, weightage } = test;
  const status = isLoading ? 'busy' : testStatus ? 'success' : 'failed';
  return (
    <li className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div
        className={`flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-${
          status === 'success' ? 'green' : status === 'failed' ? 'red' : 'gray'
        }-600`}
      >
        {status === 'success' ? (
          <DoneIcon />
        ) : status === 'failed' ? (
          <CloseIcon />
        ) : (
          <Loader type="Puff" color="#fff" height={30} width={30} />
        )}
      </div>
      <div className="flex-1 px-4 py-2 truncate">
        <a
          href="#"
          className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150"
        >
          {title}
        </a>
        <p className="text-sm leading-5 text-gray-500">{status}</p>
      </div>
      {/* <div className="flex-shrink-0 pr-2"> */}
      <Popup
        trigger={
          <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
            <VisibilityIcon />
          </button>
        }
        nested
        // position="right center"
        modal
      >
        {(close) => <TestCaseModal close={close} test={test} />}
      </Popup>
      {/* </div> */}
    </li>
  );
};

const TestCaseStatus = ({ testCases }) => {
  return (
    <div>
      <div>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Test Cases</h2>
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testCases.map((test, key) => (
            <TestCaseItem
              key={key}
              test={test}
              // title={`Testcase ${key + 1}`}
              // status={test.isLoading ? 'busy' : test.testStatus ? 'success' : 'failed'}
              // message=""
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestCaseStatus;
