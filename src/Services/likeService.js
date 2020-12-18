import axios from "axios";
import { getCurrUser } from "./balanceService";

export async function likeService(quizId) {
  const userId = getCurrUser()._id;
  const liked = await axios.put(`/api/quizzes/addLiked/${quizId}/${userId}`);
  return liked.data;
}

export async function unlikeService(quizId) {
  const userId = getCurrUser()._id;
  const unlike = await axios.put(`/api/quizzes/unlike/${quizId}/${userId}`);
  return unlike.data;
}
export async function dislikeService(quizId) {
  const userId = getCurrUser()._id;
  console.log("the function is running");
  const unlike = await axios.put(
    `/api/quizzes/addDisliked/${quizId}/${userId}`
  );
  return unlike.data;
}
