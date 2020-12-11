import axios from "axios";
import decode from "jwt-decode";

export const balanceService = async () => {
  const currUser = decode(localStorage.getItem("token"));
  const userId = currUser._id;
  const balance = await axios.post("api/users/balance", { userId });
  if (balance.data === false) {
    return 0;
  }
  return balance.data.balance;
};
