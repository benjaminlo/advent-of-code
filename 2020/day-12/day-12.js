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

const getManhattanDistBetweenStartAndEnd2 = (input) => {
  let shipCoords = { x: 0, y: 0 };
  let waypointCoords = { x: 10, y: 1 };
  input.forEach((line) => {
    const action = line[0];
    const value = parseInt(line.slice(1));
    switch (action) {
      case "L":
      case "R":
        waypointCoords = getNewWaypointCoords(waypointCoords, action, value);
        break;
      case "F":
        shipCoords.x += waypointCoords.x * value;
        shipCoords.y += waypointCoords.y * value;
        break;
      default:
        waypointCoords = getNewCoords(waypointCoords, action, value);
        break;
    }
    console.log(shipCoords, waypointCoords);
  });

  return getManhattanDist(shipCoords.x, shipCoords.y);
};

const getNewWaypointCoords = (waypointCoords, turnDir, deg) => {
  const numTurns = turnDir === "R" ? (deg / 90) % 4 : 4 - ((deg / 90) % 4);

  if (numTurns === 0) return waypointCoords;
  else if (numTurns === 1) {
    const tempY = waypointCoords.y;
    waypointCoords.y = -waypointCoords.x;
    waypointCoords.x = tempY;
  } else if (numTurns === 2) {
    waypointCoords.x = -waypointCoords.x;
    waypointCoords.y = -waypointCoords.y;
  } else if (numTurns === 3) {
    const tempY = waypointCoords.y;
    waypointCoords.y = waypointCoords.x;
    waypointCoords.x = -tempY;
  }

  return waypointCoords;
};

console.log(getManhattanDistBetweenStartAndEnd(input));
console.log(getManhattanDistBetweenStartAndEnd2(input));
// That's not the right answer; your answer is too low. If you're stuck,
// make sure you're using the full input data; there are also some general tips on
// the about page, or you can ask for hints on the subreddit. Please wait one
// minute before trying again. (You guessed 48308.) [Return to Day 12]
