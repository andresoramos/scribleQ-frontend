function returnAccountId(accountStr, id, boughtQuiz) {
  if (boughtQuiz) {
    const bq = JSON.parse(localStorage.getItem("boughtQuiz"));
    return bq._id;
  }
  const accountObj = JSON.parse(accountStr);
  const selectedQuiz = accountObj.quizzes[id];
  const foundId = selectedQuiz.quiz._id;
  return foundId;
}

export default returnAccountId;
