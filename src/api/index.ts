import executeCode from './methods/executeCode';
import login from './methods/login';
import register from './methods/register';
import createChallenge from './methods/createChallenge';
import getChallenge from './methods/getChallenge';
import isUserAuthorizedToChallenge from './methods/isUserAuthorizedToChallenge';
import isUserAuthorizedToContest from './methods/isUserAuthorizedToContest';
import updateChallenge from './methods/updateChallengeInfo';
import createTestcase from './methods/createTestcase';
import getChallengeTestcase from './methods/getChallengeTestcase';
import removeTestcase from './methods/removeTestcase';
import getChallengeInfo from './methods/getChallengeInfo';
import createContest from './methods/createContest';
import getContest from './methods/getContest';
import updateContest from './methods/updateContestInfo';
import removeContest from './methods/removeContest';
import searchChallenges from './methods/searchChallenges';
import addChallengeToContest from './methods/addChallengeToContest';
import getContestChallenges from './methods/getContestChallenges';

export {
    executeCode,
    login,
    register,
    createChallenge,
    getChallenge,
    isUserAuthorizedToChallenge,
    updateChallenge,
    createTestcase,
    isUserAuthorizedToContest,
    getChallengeTestcase,
    removeTestcase,
    getChallengeInfo,
    getContest,
    createContest,
    updateContest,
    removeContest,
    searchChallenges,
    addChallengeToContest,
    getContestChallenges,
};
