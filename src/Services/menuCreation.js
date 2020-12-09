import getEditDistance from "./levensteinDistance";
import { alphaService } from "../Services/alphaService";
import _ from "lodash";
export const findSimilarities = () => {};
export const matchByTags = (term, marketArr, makerArr, quizArr) => {
  if (term.length === 0) {
    return [];
  }
  let returnArr = [];
  for (var i = 0; i < marketArr.length; i++) {
    let { tags } = marketArr[i].history;
    if (tags === "") {
      continue;
    } else {
      const tagsArr = parseString(tags);
      for (var j = 0; j < tagsArr.length; j++) {
        if (tagsArr[j] === term) {
          returnArr.push(marketArr[i]);
          break;
        } else {
          if (tagsArr[j].length >= 5) {
            const levDist = getEditDistance(tagsArr[j], term);
            if (levDist === 1) {
              console.log(marketArr[i], "this is the obj");
              //create a function that find the quiz by maker id
              //push the quiz into the returnarr
              //return the returnarr
              break;
            }
          }
        }
      }

      //if it's not a match, do a final check to see its ld from the chosen term
      //if the the tag is more than 5 letters.  If the ld is 1, add it to the
      //return arr
    }
  }
  console.log(returnArr);

  //create function to parse tags if they exist and convert them into an array
};
export const matchByContains = (term, arr, abridged) => {
  if (term.length === 0) {
    return [];
  }
  let returnArr = [];
  //only if words contain term at their beginning will we return them
  for (var i = 0; i < arr.length; i++) {
    if (returnArr.length >= 5 && abridged === true) {
      return returnArr;
    }
    if (arr[i].name[0].toLowerCase() !== term[0].toLowerCase()) {
      continue;
    }
    if (arr[i].name.length >= term.length) {
      let firstFew = arr[i].name.slice(0, term.length);
      if (firstFew.toLowerCase() === term.toLowerCase()) {
        returnArr.push(arr[i]);
      }
    }
  }
  return returnArr;
};
export const matchBySpelling = (term, arr, returnArr) => {
  if (arr.length === 0 || returnArr.length === 5) {
    return returnArr;
  }
  let index = 0;
  let levDist = getEditDistance(term, arr[0].name);
  let changed = {
    changed: false,
    multiples: false,
    [levDist]: [{ name: arr[0].name, index: 0 }],
  };
  for (var i = 1; i < arr.length; i++) {
    const distance = getEditDistance(
      term.toLowerCase(),
      arr[i].name.toLowerCase()
    );
    if (distance < levDist) {
      levDist = distance;
      index = i;
      if (!changed[distance]) {
        changed[distance] = [];
        let changeObj = { name: arr[i].name, index: i };
        changed[distance].push(changeObj);
      }
      if (!changed.changed) {
        changed.changed = true;
      }
      if (changed.multiples) {
        changed.multiples = false;
      }
    } else {
      if (distance === levDist) {
        changed.multiples = true;
        let changeObj = { name: arr[i].name, index: i };
        changed[distance].push(changeObj);
      }
    }
  }
  const lowest = findLowestNumber(changed);
  if (!changed.multiples) {
    const index = changed[lowest][0].index;
    const returnQuiz = arr[index];
    returnArr.push(returnQuiz);
    arr.splice(index, 1);
    return matchBySpelling(term, arr, returnArr);
  } else {
    let clonedArr = _.cloneDeep(changed[lowest]);
    const alphabetized = alphabetize(clonedArr, term);
    const index = arr.findIndex((item) => {
      return item.name.toLowerCase() === alphabetized;
    });
    const returnQuiz = arr[index];
    returnArr.push(returnQuiz);
    arr.splice(index, 1);
    return matchBySpelling(term, arr, returnArr);
  }
};

const alphabetize = (arr, term) => {
  let names = arr.map((item) => {
    return item.name.toLowerCase();
  });
  names.push(term);
  names = names.sort();
  return alphaService(names, term);
};

const parseString = (string) => {
  string += ",";
  let returnArr = [];
  let newWord = "";
  for (var i = 0; i < string.length; i++) {
    if (string[i] === ",") {
      returnArr.push(newWord);
      newWord = "";
    } else {
      if (string[i] === " " && string[i - 1] === ",") {
        continue;
      }
      newWord += string[i];
    }
  }
  return returnArr;
};

const findLowestNumber = (changed) => {
  const keys = Object.keys(changed);
  let compare = Number(keys[0]);
  for (var i = 0; i < keys.length; i++) {
    compare = Number(keys[i]) < compare ? Number(keys[i]) : compare;
  }
  return compare;
};
