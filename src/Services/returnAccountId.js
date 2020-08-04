function returnAccountId(accountStr, id) {
  const accountObj = JSON.parse(accountStr);
  const selectedQuiz = accountObj.quizzes[id];
  const foundId = selectedQuiz.quiz._id;
  return foundId;
}

export default returnAccountId;
