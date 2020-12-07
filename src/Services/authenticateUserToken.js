import axios from "axios";
import decode from "jwt-decode";
async function authenticateUserToken(token) {
  if (!token) {
    return false;
  }
  try {
    const tokenPayload = { token };
    const personExists = await axios.post("/api/users/exists", tokenPayload);
    return personExists.data;
  } catch (err) {
    console.log(err, "You  hit this error at AuthenticateUserToken.js");
  }
}

export const findCurrentUser = () => {
  if (localStorage.getItem("token")) {
    const userInfo = decode(localStorage.getItem("token"));
    return userInfo;
  }
};

export default authenticateUserToken;
