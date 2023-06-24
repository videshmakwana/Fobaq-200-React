import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

export const signUpAccount = async (data) => {
  const config = { headers };
  try {
    const response = await axios.post(
      `${apiUrl}rest/accounts/signUp`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginVerifier = async (data) => {
  try {
    // Make a POST request to the login endpoint with the provided data
    const response = await axios.post(`${apiUrl}rest/accounts/logIn`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data) => {
  return await axios.post(`${apiUrl}rest/accounts/password/forget/${data}`);
};

export const setUserPassword = (data) => {
  const config = { headers };

  return axios.put(`${apiUrl}rest/accounts/password/change`, data, config);
};
