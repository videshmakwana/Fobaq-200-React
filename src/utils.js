export const setDataInLocalStorage = (data) => {
  console.log(data);
  if (data?.token) {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("email", data?.email);
    localStorage.setItem("userId", data?.userId);
  }
};
