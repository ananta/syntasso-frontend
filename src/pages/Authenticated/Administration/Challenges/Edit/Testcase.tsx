import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from 'components/Common/Button';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import { createTestcase, getChallengeTestcase, removeTestcase } from 'api';

import InfoWithButton from 'components/Common/InfoWithButton';
import { toast } from 'react-toastify';
import CustomLoader from 'components/Common/CustomLoader';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '70%',
    left: '15%',
    top: '10%',
    height: '80%',
  },
};

interface RouteWithProps extends RouteComponentProps {
  challengeId: string;
}

const Testcase: React.FC<RouteWithProps> = (RouteProps) => {
  const { challengeId } = RouteProps;

  const [isAddingTestcase, setIsAddingTestcase] = useState(false);
  const [testcases, setTestcases] = useState([]);

  const [isGettingTestcase, setIsGettingTestcase] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [viewTestCase, setViewTestCase] = React.useState({
    testcase: {
      testcaseId: '',
      sampleInput: '',
      weightage: '',
      sampleOutput: '',
    },
    isVisible: false,
  });

  function openModal() {
    setIsOpen(true);
  }
  const [input, setInput] = useState({
    weightage: '',
    sampleInput: '',
    sampleOutput: '',
  });

  const handleChange = (name, value) => {
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };
  const AuthState = useSelector((state) => state['Auth'].data);

  function closeModal() {
    setIsOpen(false);
  }
  const getTestCase = async () => {
    try {
      setIsGettingTestcase(true);
      const testCasesRes = await getChallengeTestcase({
        token: AuthState.user.token,
        challengeId,
      });
      if (!testCasesRes.isSuccess) throw new Error(testCasesRes.message);
      setTestcases(testCasesRes.response.testcases);
      console.log(testCasesRes);
      setIsGettingTestcase(true);
    } catch (err) {
      toast.error(err.message);
      setIsGettingTestcase(false);
    }
  };

  const removeTest = async (testcaseId: string) => {
    try {
      const testCasesRes = await removeTestcase({
        token: AuthState.user.token,
        testcaseId,
      });
      if (!testCasesRes.isSuccess) throw new Error(testCasesRes.message);
      getTestCase();
      toast.success('Removed Testcase with id: ' + testcaseId);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addTestCase = async () => {
    try {
      console.log('Adding test case');
      setIsAddingTestcase(true);
      const newTestcase = {
        weightage: Number(input.weightage),
        sampleInput: input.sampleInput.trim().replace(/\u21b5/g, '\n'),
        sampleOutput: input.sampleOutput.trim().replace(/\u21b5/g, '\n'),
      };
      console.log({ challengeId });
      const addTestCaseRes = await createTestcase({
        token: AuthState.user.token,
        challengeId: parseInt(challengeId),
        testcase: newTestcase,
      });
      if (!addTestCaseRes.isSuccess) throw new Error(addTestCaseRes.message);

      setIsOpen(false);
      setIsAddingTestcase(false);
      toast.success('Testcase Addedd Successfully!');
      console.log(newTestcase);
      getTestCase();
    } catch (err) {
      setIsOpen(false);
      toast.error(err.message);
      setIsAddingTestcase(false);
    }
  };
  useEffect(() => {
    getTestCase();
  }, []);
  if (isGettingTestcase) return <CustomLoader />;
  return (
    <div>
      <InfoWithButton onClick={() => openModal()} title="Create Testcase">
        <div>
          You must add at least one test case. <span className="text-blue-600 underline cursor-pointer">FAQ </span>.
        </div>
      </InfoWithButton>
      <div>
        <div className="py-8 w-full">
          <div className="shadow overflow-hidden rounded border-b border-gray-200">
            {testcases.length === 0 ? (
              <div className="full-width flex justify-center content-center"></div>
            ) : (
              <table className="min-w-full bg-white">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Points</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Info</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Updates</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {testcases.map((testcase, indx) => (
                    <tr key={indx.toString()}>
                      <td className="w-1/3 text-left py-3 px-4">Test #{testcase.testcaseId}</td>
                      <td className="w-1/3 text-left py-3 px-4">{testcase.weightage}</td>
                      <td className="text-left py-3 px-4">
                        <div
                          className="hover:text-blue-500 cursor-pointer"
                          onClick={() => {
                            setViewTestCase((state) => ({
                              ...state,
                              isVisible: true,
                              testcase,
                            }));
                          }}
                        >
                          View
                        </div>
                      </td>
                      <td className="text-left py-3 px-4">
                        <div
                          onClick={() => {
                            removeTest(testcase.testcaseId);
                          }}
                          className="hover:text-red-500 text-red-600 "
                        >
                          Remove
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div className="modal-content py-4 text-left px-6 w-full">
          <div className="flex justify-between items-center pb-3 w-full">
            <p className="text-2xl font-bold">Add Test Case</p>
            <div className="modal-close cursor-pointer z-50">
              <svg
                onClick={closeModal}
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5 ">
            <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Testcase Points
              </label>
              <input
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                id="grid-text-1"
                type="text"
                required
                onChange={(e) => handleChange('weightage', e.target.value)}
                value={input.weightage}
              />
            </div>
            <div className="md:flex w-full md:w-full px-3 mb-6 ">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Input:
              </label>
              <textarea
                rows={8}
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                required
                onChange={(e) => handleChange('sampleInput', e.target.value)}
                value={input.sampleInput}
              />
            </div>
            <div className="md:flex w-full md:w-full px-3 mb-6 ">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Output:
              </label>
              <textarea
                rows={8}
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                required
                onChange={(e) => handleChange('sampleOutput', e.target.value)}
                value={input.sampleOutput}
              />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div>
              <Button title="Cancel" disabled={isAddingTestcase} color="gray-700" onClick={() => closeModal()} />
            </div>
            <div>
              <Button title="Confirm" onClick={addTestCase} isBusy={isAddingTestcase} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={viewTestCase.isVisible}
        onRequestClose={() =>
          setViewTestCase((state) => ({
            ...state,
            isVisible: false,
          }))
        }
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div className="modal-content py-4 text-left px-6 w-full">
          <div className="flex justify-between items-center pb-3 w-full">
            <p className="text-2xl font-bold">View Test Case</p>
            <div className="modal-close cursor-pointer z-50">
              <svg
                onClick={() => {
                  setViewTestCase((state) => ({
                    ...state,
                    isVisible: false,
                  }));
                }}
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5 ">
            <div className="md:flex w-full md:w-full px-3 mb-6 items-center">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Testcase Points
              </label>
              <input
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                id="grid-text-1"
                type="text"
                required
                // onChange={(e) => handleChange('weightage', e.target.value)}
                value={viewTestCase.testcase.weightage}
              />
            </div>
            <div className="md:flex w-full md:w-full px-3 mb-6 ">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Input:
              </label>
              <textarea
                rows={8}
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                required
                onChange={(e) => handleChange('sampleInput', e.target.value)}
                value={viewTestCase.testcase.sampleInput}
              />
            </div>
            <div className="md:flex w-full md:w-full px-3 mb-6 ">
              <label
                className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold"
                htmlFor="grid-text-1"
              >
                Output:
              </label>
              <textarea
                rows={8}
                className="flex flex-1 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                required
                onChange={(e) => handleChange('sampleOutput', e.target.value)}
                value={viewTestCase.testcase.sampleOutput}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Testcase;
