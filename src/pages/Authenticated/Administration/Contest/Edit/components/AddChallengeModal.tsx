import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'components/Common/Button';
import AsyncSelect from 'react-select/async';
import { searchChallenges } from 'api';
import { toast } from 'react-toastify';
import { addChallengeToContest } from 'api';

interface IAddChallengeModa {
  contestId: string;
  handleCloseModal: () => void;
}

const customSelectContainer = {
  menu: (provided, state) => ({
    ...provided,
    color: state.selectProps.menuColor,
  }),
  control: (base, state) => ({
    ...base,
    // border: "0 !important",
    boxShadow: '0 !important',
    '&:hover': {
      border: '0 !important',
    },
  }),
  container: (base) => ({
    ...base,
    flex: 1,
  }),
};

const AddChallengeModal: React.FC<IAddChallengeModa> = ({ handleCloseModal, contestId }) => {
  const AuthState = useSelector((state) => state['Auth']);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const getChallenges = async (inputValue: string) => {
    try {
      const options = {
        token: AuthState.data.user.token,
        limit: 5,
        page: 1,
        type: 'challenges',
      };
      if (inputValue.length > 0) {
        options['query'] = inputValue;
      }
      const challengesRes = await searchChallenges(options);
      if (!challengesRes.isSuccess) throw new Error(challengesRes.message);
      return challengesRes.response.data.challenges;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadChallenge = async (inputValue) => {
    const requestResult = await getChallenges(inputValue);
    return requestResult;
  };

  const handleAddChallenge = async () => {
    try {
      setIsAddingChallenge(true);
      const addChallengeResponse = await addChallengeToContest({
        token: AuthState.data.user.token,
        challengeId: selectedChallenge.Challenge_challengeId,
        contestId: parseInt(contestId),
      });
      toast.success(addChallengeResponse.response.message);
      handleCloseModal();
      setIsAddingChallenge(false);
    } catch (err) {
      toast.error(err.message);
      setIsAddingChallenge(false);
    }

    // add the logic to add challenge
  };
  console.log({ AuthState });
  return (
    <div className="modal-content py-4 text-left px-6 w-full">
      <div className="flex justify-between items-center pb-3 w-full">
        <p className="text-2xl font-bold">Add Challenge</p>
        <div className="modal-close cursor-pointer z-50">
          <svg
            onClick={handleCloseModal}
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
            className="block tracking-wide text-gray-700 text-sm mb-2 w-full md:w-1/5 font-bold "
            htmlFor="grid-text-1"
          >
            Challenge
          </label>
          <AsyncSelect
            cacheOptions
            value={selectedChallenge}
            placeholder="Enter Challenge Name"
            menuPlacement="auto"
            menuPosition="fixed"
            getOptionLabel={(e) => e.Challenge_name}
            getOptionValue={(e) => e.Challenge_challengeId}
            id="grid-text-1"
            style={customSelectContainer}
            theme={(theme) => ({
              ...theme,
              width: '100%',
              colors: {
                ...theme.colors,
                primary25: '#eabed4',
                primary75: 'hotpink',
                primary50: 'hotpink',
                primary: 'hotpink',
              },
            })}
            className="appearance-none block w-full bg-white text-gray-700  shadow-inner rounded-md  leading-tight focus:outline-none  focus:border-gray-500"
            loadOptions={loadChallenge}
            onChange={setSelectedChallenge}
          />
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <div>
          <Button title="Cancel" disabled={false} color="gray-700" onClick={handleCloseModal} />
        </div>
        <div>
          <Button
            disabled={!selectedChallenge || isAddingChallenge}
            title="Add Challenge"
            onClick={handleAddChallenge}
            isBusy={isAddingChallenge}
          />
        </div>
      </div>
    </div>
  );
};

export default AddChallengeModal;
