import axios from "axios";
import { getCurrUser } from "../Services/balanceService";

export const paidQuizzes = async () => {
  const user = getCurrUser();
  const userId = user._id;
  const paidQuizzes = await axios.post("/api/quizzes/paidQuizzes", {
    userId,
  });
  let finalArr = [];
  for (var i = 0; i < paidQuizzes.data.length; i++) {
    const creatorObj = await addCreator(
      paidQuizzes.data[i].creatorId,
      paidQuizzes.data[i]._id
    );
    if (creatorObj) {
      const fixedQuiz = {
        ...paidQuizzes.data[i],
        creatorObj,
        description: creatorObj.description,
      };
      finalArr.push(fixedQuiz);
    }
  }
  return finalArr;
};

const addCreator = async (id, quizId) => {
  const creatorObj = await axios.put(`/api/users/addCreator/${id}/${quizId}`);
  return creatorObj.data;
};
