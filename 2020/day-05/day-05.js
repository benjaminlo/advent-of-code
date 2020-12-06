const fs = require("fs");

const input = fs
  .readFileSync("2020/day-05/input.txt", "utf8")
  .trim()
  .split("\n");

const getHighestSeatId = (input) => {
  return getSeatIds(input).reduce(
    (max, curr) => Math.max(max, curr),
    Number.MIN_VALUE
  );
};

const getSeatIds = (input) => {
  let seatIds = [];
  input.forEach((boardingPass) => {
    const row = binarySearch(boardingPass.slice(0, 7), 127, "F");
    const column = binarySearch(boardingPass.slice(7), 8, "L");
    seatIds.push(row * 8 + column);
  });

  return seatIds;
};

const binarySearch = (sequence, max, lowDir) => {
  let min = 0;
  for (let dir of sequence) {
    const mid = (min + max) / 2;
    if (dir === lowDir) max = Math.floor(mid);
    else min = Math.ceil(mid);
  }

  return min;
};

console.log(getHighestSeatId(input));
