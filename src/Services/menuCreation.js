import { get } from "lodash";
import getEditDistance from "./levensteinDistance";

export const findSimilarities = () => {};
export const matchBySpelling = (term, arr) => {
  let index = 0;
  let levDist = getEditDistance(term, arr[0].name);
  for (var i = 0; i < arr.length; i++) {
    const distance = getEditDistance(term, arr[i].name);
    if (levDist > distance) {
      levDist = distance;
      index = i;
    }
  }
};
