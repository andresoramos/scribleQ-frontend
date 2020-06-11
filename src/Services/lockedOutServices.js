import axios from "axios";

export const checkIfLockedOut = (ip) => {};

export const addToLockedOut = async (ip) => {
  try {
    const check = await axios.get("http://localhost:5000/api/lockedOut");
    console.log(check, "Our check has revealed this");
    if (check.length === []) {
      await axios.post("http://localhost:5000/api/lockedOut", {
        ips: { dudProp: true },
      });
    }
    const identify = await axios.get("http://localhost:5000/api/lockedOut");
    console.log(identify, "this is identify");
    // const lockedOut = axios.put("http://localhost:5000/api/lockedOut", { ip });
  } catch (err) {
    console.log("This is your error: ", err.response);
  }
};
