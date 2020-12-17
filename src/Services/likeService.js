import axios from "axios";
import { getCurrUser } from "./balanceService";

export async function likeService(quizId) {
  const userId = getCurrUser()._id;
  const liked = await axios.put(`/api/quizzes/addLiked/${quizId}/${userId}`);
  return liked.data;
  //if you receive true, update state
  //if somehow false, make it give message
  //saying quiz cannot be found
}
