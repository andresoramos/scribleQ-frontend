import axios from "axios";

export const tokensService = async (payload) => {
  try {
    console.log("Entering Tokenfound");
    const tokenFound = await axios.post("/api/tokens", payload);
    console.log("Exiting Tokenfound");
    return tokenFound;
  } catch (err) {
    console.log("you hit an error in token found");
    console.log("This is your error: ", err.response);
  }
};
