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

export const getUserInfo = async (userId) => {
  try {
    const userInfo = await axios.put(`/api/users/getUserInfo/${userId}`);
    return userInfo.data;
  } catch (error) {
    console.log(`There's been an error at authenticateUserToken/getUserInfo`);
  }
};

export default authenticateUserToken;
