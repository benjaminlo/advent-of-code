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

const getNumValidPassports2 = (input) => {
  let numValidPassports = 0;
  input.forEach((passportStr) => {
    if (isValidPassport2(passportStr.split("\n"))) numValidPassports++;
  });

  return numValidPassports;
};

const isValidPassport2 = (passport) => {
  let passportFieldsMap = new Map();
  passport.forEach((line) => {
    line.split(" ").forEach((section) => {
      const sectionSplitByColon = section.split(":");
      passportFieldsMap.set(sectionSplitByColon[0], sectionSplitByColon[1]);
    });
  });

  return (
    isValidBirthYear(passportFieldsMap.get("byr")) &&
    isValidIssueYear(passportFieldsMap.get("iyr")) &&
    isValidExpirationYear(passportFieldsMap.get("eyr")) &&
    isValidHeight(passportFieldsMap.get("hgt")) &&
    isValidHairColor(passportFieldsMap.get("hcl")) &&
    isValidEyeColor(passportFieldsMap.get("ecl")) &&
    isValidPassportId(passportFieldsMap.get("pid"))
  );
};

const isValidBirthYear = (birthYearStr) => {
  try {
    if (birthYearStr.length != 4) return false;

    const birthYear = parseInt(birthYearStr);
    return birthYear >= 1920 && birthYear <= 2002;
  } catch (e) {
    return false;
  }
};

const isValidIssueYear = (issueYearStr) => {
  try {
    if (issueYearStr.length != 4) return false;

    const issueYear = parseInt(issueYearStr);
    return issueYear >= 2010 && issueYear <= 2020;
  } catch (e) {
    return false;
  }
};

const isValidExpirationYear = (expirationYearStr) => {
  try {
    if (expirationYearStr.length != 4) return false;

    const expirationYear = parseInt(expirationYearStr);
    return expirationYear >= 2020 && expirationYear <= 2030;
  } catch (e) {
    return false;
  }
};

const isValidHeight = (heightStr) => {
  try {
    const unit = heightStr.slice(heightStr.length - 2);
    const height = parseInt(heightStr.slice(0, heightStr.length - 2));

    if (unit === "cm") return height >= 150 && height <= 193;
    else if (unit === "in") return height >= 59 && height <= 76;
    else return false;
  } catch (e) {
    return false;
  }
};

const isValidHairColor = (hairColorStr) => {
  if (hairColorStr && hairColorStr[0] === "#" && hairColorStr.length === 7)
    return hairColorStr.slice(1).match(/^[a-f0-9]+$/i);
  return false;
};

const validEyeColorsSet = new Set([
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
]);

const isValidEyeColor = (eyeColorStr) => {
  return validEyeColorsSet.has(eyeColorStr);
};

const isValidPassportId = (passportIdStr) => {
  return passportIdStr && passportIdStr.length === 9 && !isNaN(passportIdStr);
};

console.log(getNumValidPassports(input));
console.log(getNumValidPassports2(input));
