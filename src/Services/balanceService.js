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

export const getCurrUser = () => {
  const currUser = decode(localStorage.getItem("token"));
  return currUser;
};

export const tradeFunds = async (amount, item) => {
  try {
    const currUser = getCurrUser();
    const userId = currUser._id;
    const quizId = item._id;
    const creatorId = item.creatorId;
    const tradeFunds = await axios.post("api/users/tradeFunds", {
      amount,
      userId,
      quizId,
      creatorId,
    });
    return tradeFunds.data;
  } catch (error) {
    return error.response.data === "You already own this quiz."
      ? { owned: true }
      : error.response.status;
  }
};
export const addFunds = async (amount) => {
  const currUser = getCurrUser();
  const userId = currUser._id;
  const funds = await axios.post("api/users/addFunds", {
    amount,
    userId,
  });
  return funds.data.balance;
};
