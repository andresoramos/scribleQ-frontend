import { get } from "lodash";
import getEditDistance from "./levensteinDistance";
import { alphaService } from "../Services/alphaService";
export const findSimilarities = () => {};
export const matchBySpelling = (term, arr, returnArr) => {
  if (arr.length === 0) {
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
    const distance = getEditDistance(term, arr[i].name);
    console.log(distance, i, levDist, distance === levDist, "1st");
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
  console.log(index, levDist, arr[index].name, changed, "All the info");
  const lowest = findLowestNumber(changed);
  if (!changed.multiples) {
    const index = changed[lowest][0].index;
    const returnQuiz = arr[index];
    returnArr.push(returnQuiz);
    arr.splice(index, 1);
    console.log(arr, "This will be the new array");
    return matchBySpelling(term, arr, returnArr);
  } else {
    alphabetize(arr, term);
  }
};

const alphabetize = (arr, term) => {
  let names = arr.map((item) => {
    return item.name.toLowerCase();
  });
  names.push(term);
  names = names.sort();
  alphaService(names, term);
};

const findLowestNumber = (changed) => {
  const keys = Object.keys(changed);
  let compare = Number(keys[0]);
  for (var i = 0; i < keys.length; i++) {
    compare = Number(keys[i]) < compare ? Number(keys[i]) : compare;
  }
  return compare;
};
