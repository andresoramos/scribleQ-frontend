import React from "react";
import getEditDistance from "./levensteinDistance";
import { alphaService } from "../Services/alphaService";
import _ from "lodash";

export const makeDropdown = (array, term) => {
  const dropDownFinal = array.map((item, i) => {
    if (item === "--no_items@@$") {
      return (
        <div key={i} className="listItem">
          No matches
        </div>
      );
    }
    if (item === "--add_include@@$") {
      return (
        <div key={i} className="subjectName">
          <p className="subjectText">Includes</p>
        </div>
      );
    }
    if (item === "--add_contains@@$") {
      return (
        <div key={i} className="subjectName">
          <p className="subjectText">Contains</p>
        </div>
      );
    }
    if (item === "--add_tags@@$") {
      return (
        <div key={i} className="subjectName">
          <p className="subjectText">Tags</p>
        </div>
      );
    }
    return (
      <div key={i} className="listItem">
        {item.name}
      </div>
    );
  });

  const index1 = dropDownFinal.findIndex((item) => {
    if (item.props.children.props) {
      return item.props.children.props.children === "Includes";
    }
  });
  const index2 = dropDownFinal.findIndex((item) => {
    if (item.props.children.props) {
      return item.props.children.props.children === "Contains";
    }
  });
  if (dropDownFinal[index1 + 1].props.children !== "No matches") {
    for (var i = index1 + 1; i < index2; i++) {
      const firstPart = <b>{term}</b>;
      const remaining = dropDownFinal[i].props.children;
      console.log(remaining, "this is remaining");
    }
  }
  return dropDownFinal;
};

export const concatArray = (spelling, contains, tags) => {
  let returnArr = [];
  if (spelling.length !== 0) {
    for (var i = 0; i < spelling.length; i++) {
      returnArr.push(spelling[i]);
    }
  } else {
    returnArr.push("--no_items@@$");
  }
  returnArr.push("--add_include@@$");
  if (contains.length !== 0) {
    for (var i = 0; i < contains.length; i++) {
      returnArr.push(contains[i]);
    }
  } else {
    returnArr.push("--no_items@@$");
  }
  returnArr.push("--add_contains@@$");
  if (tags.length !== 0) {
    for (var i = 0; i < tags.length; i++) {
      returnArr.push(tags[i]);
    }
  } else {
    returnArr.push("--no_items@@$");
  }
  returnArr.push("--add_tags@@$");

  return returnArr;
};
export const matchByTags = (term, marketArr, quizArr) => {
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
          const quiz = findQuizById(marketArr[i], quizArr);
          returnArr.push(quiz);
          returnArr.push(quiz);
          break;
        } else {
          if (tagsArr[j].length >= 5) {
            // if (tagsArr[j] === "butts") {
            //   console.log(marketArr[i], "Individual tags");
            // }
            const levDist = getEditDistance(tagsArr[j], term);
            if (levDist === 1) {
              const quiz = findQuizById(marketArr[i], quizArr);
              returnArr.push(quiz);
              break;
            }
          }
        }
      }
    }
  }
  return returnArr;
};

const findQuizById = (market, quizArr) => {
  const { makerId } = market;
  const index = quizArr.findIndex((item) => {
    return item._id === makerId;
  });
  const quiz = quizArr[index];
  return quiz;
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
