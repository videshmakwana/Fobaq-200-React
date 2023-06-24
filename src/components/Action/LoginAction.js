import axios from "axios";

// const apiUrl = process.env.REACT_APP_BASE_URL;

const apiUrl =
  "https://af42-2405-201-2022-c90b-24d4-ea1f-29c-7329.ngrok-free.app/";

const headers = {
  "Content-Type": "application/json",
};

export const signUpAccount = async (data) => {
  console.log(apiUrl);
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
