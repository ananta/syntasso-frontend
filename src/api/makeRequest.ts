import { BASE_URL } from "./EndPoint";

const Method = {
  Get: "GET",
  Post: "POST",
  Delete: "DELETE",
};

interface RequestObject {
  method: string;
  path: string;
  data: Object;
  token?: String | string;
  rest?: Object;
}

interface RequestResponse {
  isSuccess: boolean;
  response: object;
  message: string | null | undefined;
}

const makeRequest = async ({
  method,
  path,
  data,
  token,
  ...rest
}: RequestObject): Promise<RequestResponse> => {
  const request = require("axios").default;
  const options: Object = {
    url: BASE_URL + path,
    method,
    data,
    ...rest,
  };
  try {
    console.log(options);
    const response = await request(options);
    return {
      isSuccess: true,
      response: response.data,
      message: null,
    };
  } catch (err) {
    return {
      isSuccess: false,
      response: err.response,
      message: err.message,
    };
  }
};

export { Method };

export default makeRequest;
