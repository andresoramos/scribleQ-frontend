import axios from "axios";

async function authenticateUserToken(token) {
  if (!token) {
    console.log("There no token in authTokeUser, returning false");
    return false;
  }
  try {
    const tokenPayload = { token };
    const personExists = await axios.post("/api/users/exists", tokenPayload);

    console.log(personExists.data, "There is a token, big boi");
    return personExists.data;
  } catch (err) {
    console.log(err, "You  hit this error at AuthenticateUserToken.js");
  }
}

export default authenticateUserToken;
