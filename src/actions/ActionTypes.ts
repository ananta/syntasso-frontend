const Auth = {
  Start: 'AUTH_START',
  Login: 'AUTH_LOGIN' as 'value',
  Logout: 'AUTH_LOGOUT',
  Success: 'AUTH_SUCCESS',
  Failed: 'AUTH_FAILED',
  Reset: 'AUTH_RESET',
  FetchProfile: 'AUTH_FETCH_PROFILE',
  ResetLogin: 'AUTH_RESET_LOGIN',
};

const basicActions = (name: string) => ({
  Success: `${name}_SUCCESS`,
  Fail: `${name}_FAIL`,
  Start: `${name}_START`,
});

const crudActions = (name: string) => ({
  Add: `${name}_ADD`,
  Remove: `${name}_REMOVE`,
  Get: `${name}_GET`,
  Update: `${name}_UPDATE`,
  Reset: `${name}_RESET`,
  Clear: `${name}_CLEAR`,
});

const Challenge = {
  ...basicActions('CHALLENGE'),
  ...crudActions('CHALLENGE'),
};

const Contest = {
  ...basicActions('CONTEST'),
  ...crudActions('CONTEST'),
};

export { Auth, Challenge, Contest };
