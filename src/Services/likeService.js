import axios from "axios";
import { getCurrUser } from "./balanceService";

export async function likeService(quizId, hidden) {
  const userId = getCurrUser()._id;
  const liked = await axios.post(`/api/quizzes/addLiked`, {
    userId,
    quizId,
    hidden,
  });
  return liked.data;
}
//works with hidden

export async function unlikeService(quizId, hidden) {
  const userId = getCurrUser()._id;
  const unlike = await axios.post(`/api/quizzes/unlike`, {
    quizId,
    hidden,
    userId,
  });
  return unlike.data;
}
//works with hidden

export async function dislikeService(quizId, hidden) {
  const userId = getCurrUser()._id;
  const unlike = await axios.post(`/api/quizzes/addDisliked`, {
    userId,
    hidden,
    quizId,
  });
  return unlike.data;
}
export async function unDislikeService(quizId, hidden) {
  const userId = getCurrUser()._id;
  const unlike = await axios.post(`/api/quizzes/unDislike`, {
    hidden,
    userId,
    quizId,
  });
  return unlike.data;
}
export async function deleteService(quizId, hidden) {
  const userId = getCurrUser()._id;
  const deleted = await axios.put(`/api/quizzes/delete/${quizId}/${userId}`);
  return deleted.data;
}
