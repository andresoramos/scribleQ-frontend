export default function htmlToText(question) {
  if(question === ""){
    return null
  }
  var xmlString = addSpace(question);
  var doc = new DOMParser().parseFromString(xmlString, "text/xml");
  const questionText = doc.firstChild.innerHTML;

  return questionText;
}
// &nbsp;

const addSpace = (q) => {
  let fixedString = "";
  for (var i = 0; i < q.length; i++) {
    if (
      q[i] === "&" &&
      q[i + 1] === "n" &&
      q[i + 2] === "b" &&
      q[i + 3] === "s" &&
      q[i + 4] === "p" &&
      q[i + 5] === ";"
    ) {
      i = i + 5;
      fixedString += " ";
      continue;
    }
    fixedString += q[i];
  }
  return fixedString;
};
