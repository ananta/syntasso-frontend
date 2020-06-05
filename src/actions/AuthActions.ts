import { persistor } from "store";
import { Auth } from "./ActionTypes";

interface authParams {
  input?: {
    email: string;
    password: string;
  };
  token?: string;
}

const authAction = (action: string, params: authParams) => async (
  dispatch: Function
) => {
  dispatch({ type: Auth.Start, what: action });
  switch (action) {
    case Auth.Login:
      try {
        // const {
        //   input: { email, password },
        // } = params;
        // const { token } = params;
        // console.log(email);
        // console.log(password);
        dispatch({
          type: Auth.Success,
          what: Auth.Login,
          data: { user: { token: "testToken" } },
        });

        break;
      } catch (err) {
        dispatch({
          type: Auth.Failed,
          what: Auth.Login,
          data: {},
        });
      }
      break;
    case Auth.Logout:
      dispatch({ type: "HARD_RESET" });
      break;
    default:
  }
};

export default authAction;
