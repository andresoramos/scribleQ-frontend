function quizByName(account, name) {
  const { quizzes } = account;
  let quizReturned;
  for (var i = 0; i < quizzes.length; i++) {
    if (quizzes[i].quiz.name === name) {
      quizReturned = quizzes[i];
    }
  }
  return quizReturned;
}

export default quizByName;
