const fs = require("fs");

const input = fs
  .readFileSync("2020/day-05/input.txt", "utf8")
  .trim()
  .split("\n");

const getHighestSeatId = (input) => {
  const seatIds = input.map((boardingPass) => getSeatId(boardingPass));

  return seatIds.reduce((max, curr) => Math.max(max, curr), Number.MIN_VALUE);
};

const getSeatId = (boardingPass) => {
  const row = binarySearch(boardingPass.slice(0, 7), 127, "F");
  const column = binarySearch(boardingPass.slice(7), 8, "L");

  return row * 8 + column;
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

const getMySeatId = (input) => {
  let seats = [...Array(127)].map((x) => Array(8).fill(0));
  input.forEach((boardingPass) => {
    const row = binarySearch(boardingPass.slice(0, 7), 127, "F");
    const column = binarySearch(boardingPass.slice(7), 8, "L");
    seats[row][column] = 1;
  });

  for (let i = 0; i < seats.length; i++) {
    if (!(seats[i][0] === 0 && seats[i][1] === 0)) {
      for (let j = 0; j < seats[0].length; j++) {
        if (seats[i][j] === 0) return i * 8 + j;
      }
    }
  }
};

console.log(getHighestSeatId(input));
console.log(getMySeatId(input));
