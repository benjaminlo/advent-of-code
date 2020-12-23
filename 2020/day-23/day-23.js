const fs = require("fs");

const input = fs
  .readFileSync("2020/day-23/input.txt", "utf8")
  .trim()
  .split("\n");

const getCupLabels = (input, numMoves) => {
  let cups = [...input[0]].map((cup) => parseInt(cup));
  let currCupIndex = 0;
  for (let i = 0; i < numMoves; i++) {
    [cups, currCupIndex] = getNewCupArrangement(cups, currCupIndex);
  }
  const oneIndex = cups.indexOf(1);

  return cups
    .slice((oneIndex + 1) % cups.length)
    .concat(cups.slice(0, oneIndex))
    .join("");
};

const getNewCupArrangement = (cups, currCupIndex) => {
  const currCupLabel = cups[currCupIndex];
  let destCupLabel = cups[currCupIndex] === 1 ? 9 : cups[currCupIndex] - 1;
  let cupsToMove = [];
  for (let i = 0; i < 3; i++) {
    const cupIndex = (cups.indexOf(currCupLabel) + 1) % cups.length;
    cupsToMove.push(cups[cupIndex]);
    cups.splice(cupIndex, 1);
  }
  while (cupsToMove.find((cup) => cup === destCupLabel)) {
    destCupLabel = destCupLabel === 1 ? 9 : destCupLabel - 1;
  }
  const destCupIndex = cups.indexOf(destCupLabel);
  for (let i = cupsToMove.length - 1; i >= 0; i--) {
    cups.splice(destCupIndex + 1, 0, cupsToMove[i]);
  }
  currCupIndex = (cups.indexOf(currCupLabel) + 1) % cups.length;

  return [cups, currCupIndex];
};

console.log(getCupLabels(input, 100));
