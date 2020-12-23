const fs = require("fs");

const input = fs
  .readFileSync("2020/day-10/input.txt", "utf8")
  .trim()
  .split("\n");

const getProductOfOneAndThreeJoltDifferences = (input) => {
  const adapters = input.map((line) => parseInt(line)).sort((a, b) => a - b);
  let numOneJoltDifferences = 0;
  let numThreeJoltDifferences = 0;
  let joltage = 0;
  while (adapters.length > 0) {
    const nextAdapter = adapters.shift();
    const diff = nextAdapter - joltage;
    joltage = nextAdapter;
    if (diff === 1) numOneJoltDifferences++;
    else if (diff === 3) numThreeJoltDifferences++;
  }
  numThreeJoltDifferences++; // device's built-in adapter

  return numOneJoltDifferences * numThreeJoltDifferences;
};

const getNumDistinctAdapterArrangements = (input) => {
  const adapters = input.map((line) => parseInt(line)).sort((a, b) => b - a);
  let numDistinctAdapterArrangements = 0;
  console.log(adapters);

  return numDistinctAdapterArrangements;
};

const getNumDistinctAdapterArrangementsHelper = (adapters) => {};

console.log(getProductOfOneAndThreeJoltDifferences(input));
console.log(getNumDistinctAdapterArrangements(input));
