import axios from "axios";

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

export default authenticateUserToken;
