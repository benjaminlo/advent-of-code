const fs = require("fs");

const input = fs
  .readFileSync("2020/day-02/input.txt", "utf8")
  .trim()
  .split("\n");

const getNumValidPasswords = (input) => {
  let numValidPasswords = 0;
  input.forEach((line) => {
    if (isPasswordValid(line)) numValidPasswords++;
  });

  return numValidPasswords;
};

const isPasswordValid = (line) => {
  const splitOnSpaces = line.split(" ");
  const splitOnHyphen = splitOnSpaces[0].split("-");
  const low = parseInt(splitOnHyphen[0]);
  const high = parseInt(splitOnHyphen[1]);
  const char = splitOnSpaces[1][0];
  let password = splitOnSpaces[2];

  for (let i = 0; i < low; i++) {
    let index = password.indexOf(char);
    if (index === -1) return false;
    password = password.slice(index + 1);
  }
  for (let i = 0; i < high - low; i++) {
    password = password.slice(password.indexOf(char) + 1);
    if (password.length === 0) return true;
  }
  return password.indexOf(char) === -1;
};

const getNumValidPasswords2 = (input) => {
  let numValidPasswords = 0;
  input.forEach((line) => {
    if (isPasswordValid2(line)) numValidPasswords++;
  });

  return numValidPasswords;
};

const isPasswordValid2 = (line) => {
  const splitOnSpaces = line.split(" ");
  const splitOnHyphen = splitOnSpaces[0].split("-");
  const low = parseInt(splitOnHyphen[0]);
  const high = parseInt(splitOnHyphen[1]);
  const char = splitOnSpaces[1][0];
  let password = splitOnSpaces[2];

  const isLowMatch = password.charAt(low - 1) === char;
  const isHighMatch = password.charAt(high - 1) === char;

  return isLowMatch ? !isHighMatch : isHighMatch;
};

console.log(getNumValidPasswords(input));
console.log(getNumValidPasswords2(input));
