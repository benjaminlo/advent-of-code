const fs = require("fs");

const input = fs
  .readFileSync("2020/day-11/input.txt", "utf8")
  .trim()
  .split("\n");

const getNumOccupiedSeats = (input) => {
  let numOccupiedSeats = 0;
  let seats = input.map((line) => [...line]);
  for (let i = 0; i < 10; i++) {
    const occupiedSeats = getModifiedSeats(seats, true);
    occupiedSeats.forEach((seat) => (seats[seat[0]][seat[1]] = "#"));
    for (let i = 0; i < seats.length; i++) {
      console.log(seats[i].join(""));
    }
    console.log();
    const emptySeats = getModifiedSeats(seats, false);
    emptySeats.forEach((seat) => (seats[seat[0]][seat[1]] = "L"));
    for (let i = 0; i < seats.length; i++) {
      console.log(seats[i].join(""));
    }
    console.log();
  }
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[0].length; j++) {
      if (seats[i][j] === "#") numOccupiedSeats++;
    }
  }

  return numOccupiedSeats;
};

const getModifiedSeats = (seats, isDeterminingOccupied) => {
  const seatStatus = isDeterminingOccupied ? "L" : "#";
  let modifiedSeats = [];
  for (let i = 0; i < seats.length; i++) {
    const hasRowUp = i - 1 >= 0;
    const hasRowDown = i + 1 < seats.length;
    for (let j = 0; j < seats[0].length; j++) {
      const hasColLeft = j - 1 >= 0;
      const hasColRight = j + 1 < seats[0].length;
      if (seats[i][j] === seatStatus) {
        const numOccupiedAdjacentSeats = getNumOccupiedAdjacentSeats(
          seats,
          hasRowUp,
          hasRowDown,
          hasColLeft,
          hasColRight,
          i,
          j
        );
        if (
          (isDeterminingOccupied && numOccupiedAdjacentSeats === 0) ||
          numOccupiedAdjacentSeats >= 4
        ) {
          modifiedSeats.push([i, j]);
        }
      }
    }
  }
  return modifiedSeats;
};

const getNumOccupiedAdjacentSeats = (
  seats,
  hasRowUp,
  hasRowDown,
  hasColLeft,
  hasColRight,
  row,
  col
) => {
  let numOccupiedAdjacentSeats = 0;
  if (hasRowUp) {
    if (hasColLeft && seats[row - 1][col - 1] === "#")
      numOccupiedAdjacentSeats++;
    if (seats[row - 1][col] === "#") numOccupiedAdjacentSeats++;
    if (hasColRight && seats[row - 1][col + 1] === "#")
      numOccupiedAdjacentSeats++;
  }
  if (hasColLeft && seats[row][col - 1] === "#") numOccupiedAdjacentSeats++;
  if (hasColRight && seats[row][col + 1] === "#") numOccupiedAdjacentSeats++;
  if (hasRowDown) {
    if (hasColLeft && seats[row + 1][col - 1] === "#")
      numOccupiedAdjacentSeats++;
    if (seats[row + 1][col] === "#") numOccupiedAdjacentSeats++;
    if (hasColRight && seats[row + 1][col + 1] === "#")
      numOccupiedAdjacentSeats++;
  }

  return numOccupiedAdjacentSeats;
};

console.log(getNumOccupiedSeats(input));
