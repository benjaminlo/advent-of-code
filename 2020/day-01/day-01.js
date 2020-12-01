const fs = require("fs");

const input = fs
  .readFileSync("2020/day-01/input.txt", "utf8")
  .trim()
  .split("\n");

function multiplyTwoEntriesThatSumTo2020(input) {
  let set = new Set();
  let entries = input.map((str) => parseInt(str));

  for (let i = 0; i < entries.length; i++) {
    let target = 2020 - entries[i];
    if (set.has(target)) return entries[i] * target;
    set.add(entries[i]);
  }
}

function multiplyThreeEntriesThatSumTo2020(input) {
  let set = new Set();
  let entries = input.map((str) => parseInt(str));

  for (let i = 0; i < entries.length; i++) {
    for (let j = 1; j < entries.length; j++) {
      let target = 2020 - entries[i] - entries[j];
      if (set.has(target)) return entries[i] * entries[j] * target;
      set.add(entries[j]);
    }
    set.add(entries[i]);
  }
}

console.log(multiplyTwoEntriesThatSumTo2020(input));
console.log(multiplyThreeEntriesThatSumTo2020(input));
