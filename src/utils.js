export const setDataInLocalStorage = (data) => {
  if (data?.token) {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("email", data?.email);
    localStorage.setItem("userId", data?.userId);
  }
};

export const clearLocalStorage = async () => {
  localStorage.clear();
};

export const getLocalStorageData = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  return { token, email };
};
