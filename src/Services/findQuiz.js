export function findQuiz(str, i) {
  const obj = JSON.parse(str);
  const iParsed = JSON.parse(i);
  const selectedQuiz = obj.quizzes[i];
  return selectedQuiz;
}

export function findScoreScreen(string) {
  return JSON.parse(localStorage.getItem(string));
}
