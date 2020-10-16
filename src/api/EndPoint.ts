const API_URL = '127.0.0.1';
const PORT_NODE = '4000';

const BASE_URL = `http://${API_URL}:${PORT_NODE}`;

const EndPoint = {
  Execute: '/execute',
  Register: '/register',
  Login: '/login',
  Search: '/search',
  Profile: '/profile',
  Challenges: '/challenges',
  Contest: '/contest',
  Editorial: '/editorial',
  Submission: '/submissions',
  Testcase: '/testcase',
};

export { BASE_URL };

export default EndPoint;
