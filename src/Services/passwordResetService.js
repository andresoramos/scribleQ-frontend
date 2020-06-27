import axios from "axios";

export const getResetToken = async (body) => {
  try {
    const token = await axios.post("/api/passwordReset", body);
    return token;
  } catch (err) {
    console.log("You had the following error: ", err);
  }
};

export const setNewPassword = async (payload) => {
  try {
    console.log("getting into the try block of set passsword");
    const put = await axios.put("/api/passwordReset", payload);
    console.log(put, "this is the put");
    return put;
  } catch (err) {
    console.log("Error Response: ", err.response);
  }
};
