const fs = require("fs");

const input = fs
  .readFileSync("2020/day-04/input.txt", "utf8")
  .trim()
  .split("\n\n");

const getNumValidPassports = (input) => {
  let numValidPassports = 0;
  input.forEach((passportStr) => {
    if (isValidPassport(passportStr.split("\n"))) numValidPassports++;
  });

  return numValidPassports;
};

const validPassportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const isValidPassport = (passport) => {
  let passportFields = [];
  passport.forEach((line) => {
    line.split(" ").forEach((section) => {
      passportFields.push(section.split(":")[0]);
    });
  });
  const difference = validPassportFields.filter(
    (x) => !passportFields.includes(x)
  );

  return difference.length === 0;
};

console.log(getNumValidPassports(input));
