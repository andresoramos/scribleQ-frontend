import { get } from "lodash";
import getEditDistance from "./levensteinDistance";

export const findSimilarities = () => {};
export const matchBySpelling = (term, arr) => {
  let index = 0;
  let levDist = getEditDistance(term, arr[0].name);
  let changed = {
    changed: false,
    multiples: false,
    [levDist]: [{ name: arr[0].name, index: 0 }],
  };
  for (var i = 1; i < arr.length; i++) {
    const distance = getEditDistance(term, arr[i].name);
    console.log(distance, i, levDist, "1st");
    if (distance < levDist) {
      levDist = distance;
      index = i;
      if (!changed.changed) {
        changed.changed = true;
      }
      if (changed.multiples) {
        changed.multiples = false;
      }
    } else {
      if (distance === levDist) {
        console.log(distance, i, levDist, "2nd");
        changed.multiples = true;
        if (!changed[distance]) {
          changed[distance] = [];
          let changeObj = { name: arr[i].name, index: i };
          changed[distance].push(changeObj);
        } else {
          console.log("Second option is happening");
          let changeObj = { name: arr[i].name, index: i };
          changed[distance].push(changeObj);
        }
      }
    }
  }
  console.log(index, levDist, arr[index].name, changed, "All the info");
};
