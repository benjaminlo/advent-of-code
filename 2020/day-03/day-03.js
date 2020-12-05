const fs = require("fs");

const input = fs
  .readFileSync("2020/day-03/input.txt", "utf8")
  .trim()
  .split("\n");

const getNumTrees = (input, right, down) => {
  let numTrees = 0;
  let xPos = 0;
  for (let i = 0; i < input.length; i += down) {
    if (input[i][xPos % input[i].length] === "#") numTrees++;
    xPos += right;
  }

  return numTrees;
};

const multiplyNumTreesForSlopes = (input) => {
  return (
    getNumTrees(input, 1, 1) *
    getNumTrees(input, 3, 1) *
    getNumTrees(input, 5, 1) *
    getNumTrees(input, 7, 1) *
    getNumTrees(input, 1, 2)
  );
};

console.log(getNumTrees(input, 3, 1));
console.log(multiplyNumTreesForSlopes(input));
