import axios from "axios";
import { getCurrUser } from "../Services/balanceService";

export const paidQuizzes = async () => {
  const user = getCurrUser();
  //When you wake up, finish making this service that retrieves the quizzes
  //the user has paid for and then caches them in state
};
