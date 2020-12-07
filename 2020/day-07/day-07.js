const fs = require("fs");

const input = fs
  .readFileSync("2020/day-07/input.txt", "utf8")
  .trim()
  .split("\n");

const getNumBagColors = (input) => {
  let childParentMap = new Map(); // key: child, value: [parents]
  input.forEach((rule) => {
    const { parent, children } = getParentAndChildren(rule, false);
    children.forEach((child) => {
      if (childParentMap.has(child)) childParentMap.get(child).push(parent);
      else childParentMap.set(child, [parent]);
    });
  });

  let shinyGoldParents = childParentMap.get("shiny gold");
  for (let i = 0; i < shinyGoldParents.length; i++) {
    const potentialParents = childParentMap.get(shinyGoldParents[i]);
    if (potentialParents) {
      potentialParents.forEach((potentialParent) => {
        if (!shinyGoldParents.includes(potentialParent))
          shinyGoldParents.push(potentialParent);
      });
    }
  }

  return shinyGoldParents.length;
};

const getParentAndChildren = (rule, includeCount) => {
  const splitRule = rule.split(" bags contain ");
  const parent = splitRule[0];
  const children = splitRule[1].split(", ").map((child) => {
    const splitChild = child.split(" ");
    if (splitChild.length === 4)
      return includeCount
        ? `${splitChild[0]} ${splitChild[1]} ${splitChild[2]}`
        : `${splitChild[1]} ${splitChild[2]}`;
  });

  return { parent, children };
};

const getNumBagsRequired = (input) => {
  let parentChildMap = new Map(); // key: parent, value: [children]
  input.forEach((rule) => {
    const { parent, children } = getParentAndChildren(rule, true);
    parentChildMap.set(parent, children);
  });

  return getNumBagsRequiredHelper(parentChildMap, "shiny gold");
};

const getNumBagsRequiredHelper = (parentChildMap, parent) => {
  const children = parentChildMap.get(parent);
  if (children[0] === undefined) return 0;

  return children.reduce((sum, child) => {
    const splitChild = child.split(" ");
    const numBags = parseInt(splitChild[0]);
    return (
      sum +
      numBags +
      numBags *
        getNumBagsRequiredHelper(
          parentChildMap,
          `${splitChild[1]} ${splitChild[2]}`
        )
    );
  }, 0);
};

console.log(getNumBagColors(input));
console.log(getNumBagsRequired(input));
