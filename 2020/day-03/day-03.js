const fs = require("fs");

const input = fs
  .readFileSync("2020/day-03/input.txt", "utf8")
  .trim()
  .split("\n");

const getNumTrees = (input) => {
  let numTrees = 0;
  let xPos = 0;
  input.forEach((row) => {
    if (row[xPos % row.length] === "#") numTrees++;
    xPos += 3;
  });

  return numTrees;
};

console.log(getNumTrees(input));
