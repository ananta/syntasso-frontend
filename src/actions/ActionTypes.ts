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
    Clear: `${name}_CLEAR`,
});

export { Auth };
