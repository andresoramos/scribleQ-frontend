export function alphaService(arr, term) {
  // if (arr[0] === "the third") {
  //   console.log("Please let this only run once");
  // }
  const alphaObj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
  };
  const termIndex = arr.findIndex((item) => {
    return item === term;
  });

  if (termIndex === 0) {
    return arr[1];
  }
  if (termIndex === arr.length - 1) {
    return arr[arr.length - 2];
  }
  let selected;
  for (var i = 0; i < term.length; i++) {
    let left = Math.abs(alphaObj[term[i]] - alphaObj[arr[termIndex - 1][i]]);
    let right = Math.abs(alphaObj[term[i]] - alphaObj[arr[termIndex + 1][i]]);
    if (arr[0] === "the third") {
      console.log(left, "left", right, "right");
    }
    if (left !== right) {
      selected = left < right ? arr[termIndex - 1] : arr[termIndex + 1];
      break;
    } else {
      selected = arr[termIndex + 1];
    }
  }
  if (selected) {
    return selected;
  }
  //   let left = alphaObj[arr[termIndex - 1][term.length]];
  //   let right = alphaObj[arr[termIndex + 1][term.length]];
}
