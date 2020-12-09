const fs = require("fs");

const input = fs
  .readFileSync("2020/day-08/input.txt", "utf8")
  .trim()
  .split("\n");

const getAccumulatorValueBeforeLoop = (input) => {
  let acc = 0;
  let instructionIndexSet = new Set();
  for (let i = 0; i < input.length; i++) {
    if (instructionIndexSet.has(i)) return acc;

    instructionIndexSet.add(i);
    const instruction = input[i].split(" ");
    const operation = instruction[0];
    const argument = instruction[1];
    if (operation === "acc") acc += parseInt(argument);
    else if (operation === "jmp") i += parseInt(argument) - 1;
  }
};

console.log(getAccumulatorValueBeforeLoop(input));
