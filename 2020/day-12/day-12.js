const fs = require("fs");

const input = fs
  .readFileSync("2020/day-12/input.txt", "utf8")
  .trim()
  .split("\n");

const getManhattanDistBetweenStartAndEnd = (input) => {
  let dir = "E";
  let coords = { x: 0, y: 0 };
  input.forEach((line) => {
    const action = line[0];
    const value = parseInt(line.slice(1));
    switch (action) {
      case "L":
      case "R":
        dir = getNewDirection(dir, action, value);
        break;
      case "F":
        coords = getNewCoords(coords, dir, value);
        break;
      default:
        coords = getNewCoords(coords, action, value);
        break;
    }
  });

  return getManhattanDist(coords.x, coords.y);
};

const getNewDirection = (dir, turnDir, deg) => {
  const dirs = turnDir === "R" ? "NESW" : "NWSE";
  const currDirIndex = dirs.indexOf(dir);
  const numTurns = deg / 90;
  const newDirIndex = (currDirIndex + numTurns) % 4;

  return dirs[newDirIndex];
};

const getNewCoords = (coords, dir, value) => {
  switch (dir) {
    case "N":
      coords.y += value;
      break;
    case "S":
      coords.y -= value;
      break;
    case "E":
      coords.x -= value;
      break;
    case "W":
      coords.x += value;
      break;
  }

  return coords;
};

const getManhattanDist = (x, y) => {
  return Math.abs(x) + Math.abs(y);
};

console.log(getManhattanDistBetweenStartAndEnd(input));
