export const createDate = (string) => {
  // console.log(string, typeof string, "This is the string and its type");
  const realDate = new Date(string);
  const month = realDate.getMonth() + 1;
  const date = realDate.getDate();
  const year = realDate.getFullYear();
  const finalDate =
    JSON.stringify(month) +
    "/" +
    JSON.stringify(date) +
    "/" +
    JSON.stringify(year);
  return finalDate;
};
