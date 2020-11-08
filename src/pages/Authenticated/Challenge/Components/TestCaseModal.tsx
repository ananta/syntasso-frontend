import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface ITestCaseItem {
  title?: string;
  isLoading: boolean;
  testStatus: boolean;
  observedOutputTooLong: boolean;
  sampleInput: string;
  sampleOutput: string;
  testcaseId: number;
  timedOut: boolean;
  compilerMessage?: string;
  weightage: number;
  challengeId: number;
  createdAt?: string;
  process?: number;
  type?: string;
  updatedAt?: string;
  // status: 'success' | 'busy' | 'failed';
}
interface testI {
  test: ITestCaseItem;
  close: () => void;
}

const TestCaseModal: React.FC<testI> = ({
  close,
  test: { title, testStatus, observedOutputTooLong, sampleInput, sampleOutput, timedOut, compilerMessage, weightage },
}) => (
  <div className="">
    <div className="flex flex-row">
      <div className="flex-1 px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title ? title : 'Testcase Preview'}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Summary of the testcase executed</p>
      </div>
      <div className="mr-4 mt-4 cursor-pointer">
        <CloseIcon color="primary" onClick={close} />
      </div>
    </div>
    <div>
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm leading-5 font-medium text-gray-500">Test Status</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 flex">
            {testStatus ? (
              <p className="bg-green-400 py-2 px-4 rounded text-green-900">Success</p>
            ) : (
              <p className="bg-red-400 py-2 px-4 rounded text-red-900">Failed</p>
            )}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm leading-5 font-medium text-gray-500">Points</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 flex">
            {testStatus ? (
              <p className="bg-yellow-400 h-10 w-10 justify-center flex items-center rounded-full text-orange-600 border-orange-400 border-2">
                <span className="inline-block align-middle">{weightage}</span>
              </p>
            ) : (
              <p className="bg-gray-400 h-10 w-10 justify-center flex items-center rounded-full text-gray-600 border-gray-400 border-2">
                <span className="inline-block align-middle">{weightage}</span>
              </p>
            )}
          </dd>
        </div>
        {sampleInput && (
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">Sample Input</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 bg-gray-100 rounded px-5 py-2">
              {sampleInput.split('\n').map((item, key) => (
                <p className="block" key={key}>
                  {item}
                </p>
              ))}
            </dd>
          </div>
        )}
        {sampleOutput && (
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">Sample Output</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 bg-gray-100 rounded px-5 py-2">
              {sampleOutput.split('\n').map((item, key) => (
                <p className="block" key={key}>
                  {item}
                </p>
              ))}
            </dd>
          </div>
        )}
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm leading-5 font-medium text-gray-500">Execution Message</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
            <ul className="border border-gray-200 rounded-md">
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                <div className="w-0 flex-1 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="ml-2 flex-1 w-0 truncate">Compiler Message: </span>
                    <div className="ml-2 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                      >
                        {compilerMessage ? compilerMessage : '--'}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                <div className="w-0 flex-1 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="ml-2 flex-1 w-0 truncate">Timedout</span>
                    <div className="ml-2 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                      >
                        {timedOut ? timedOut : '--'}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                <div className="w-0 flex-1 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="ml-2 flex-1 w-0 truncate">Output too long</span>
                    <div className="ml-2 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                      >
                        {observedOutputTooLong ? observedOutputTooLong : '--'}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
);

export default TestCaseModal;
