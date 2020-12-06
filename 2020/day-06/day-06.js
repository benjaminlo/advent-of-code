const fs = require("fs");

const input = fs
  .readFileSync("2020/day-06/input.txt", "utf8")
  .trim()
  .split("\n\n");

const getSumOfCounts = (input) => {
  return input.reduce((sum, group) => sum + getNumUniqueQuestions(group), 0);
};

const getNumUniqueQuestions = (group) => {
  let questionSet = new Set();
  group.split("\n").forEach((person) => {
    for (let question of person) {
      questionSet.add(question);
    }
  });

  return questionSet.size;
};

const getSumOfCounts2 = (input) => {
  return input.reduce((sum, group) => sum + getNumUnanimousQuestions(group), 0);
};

const getNumUnanimousQuestions = (group) => {
  let questions = group.split("\n").map((person) => Array.from(person));
  let unanimousQuestions = questions.reduce(
    (acc, person) => acc.filter((question) => person.includes(question)),
    questions[0]
  );

  return unanimousQuestions.length;
};

console.log(getSumOfCounts(input));
console.log(getSumOfCounts2(input));
