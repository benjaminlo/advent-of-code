const fs = require("fs");

const input = fs
  .readFileSync("2020/day-08/input.txt", "utf8")
  .trim()
  .split("\n");

const getAccumulatorValueAndIsInfiniteLoop = (input) => {
  let acc = 0;
  let instructionIndexSet = new Set();
  for (let i = 0; i < input.length; i++) {
    if (instructionIndexSet.has(i)) return { acc, isInfiniteLoop: true };

    instructionIndexSet.add(i);
    const instruction = input[i].split(" ");
    const operation = instruction[0];
    const argument = instruction[1];
    if (operation === "acc") acc += parseInt(argument);
    else if (operation === "jmp") i += parseInt(argument) - 1;
  }

  return { acc, isInfiniteLoop: false };
};

const getAccumulatorValueAfterTermination = (input) => {
  const programs = generatePrograms(input);
  for (let i = 0; i < programs.length; i++) {
    const { acc, isInfiniteLoop } = getAccumulatorValueAndIsInfiniteLoop(
      programs[i]
    );
    if (!isInfiniteLoop) return acc;
  }
};

const generatePrograms = (input) => {
  let programs = [];
  for (let i = 0; i < input.length; i++) {
    const operation = input[i].split(" ")[0];
    if (operation != "acc") {
      let newInput = Array.from(input);
      newInput[i] =
        operation === "jmp"
          ? newInput[i].replace("jmp", "nop")
          : newInput[i].replace("nop", "jmp");
      programs.push(newInput);
    }
  }

  return programs;
};

console.log(getAccumulatorValueAndIsInfiniteLoop(input).acc);
console.log(getAccumulatorValueAfterTermination(input));
