import authenticateUserToken from "./authenticateUserToken";

const loggedIn = (callBack) => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const checkIfLoggedIn = async (token) => {
      const auth = await authenticateUserToken(token);
      if (!auth) {
        return;
      }
      callBack(true);
    };
    checkIfLoggedIn(token);
  }
};

export default loggedIn;
