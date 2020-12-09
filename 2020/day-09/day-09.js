const fs = require("fs");

const input = fs
  .readFileSync("2020/day-09/input.txt", "utf8")
  .trim()
  .split("\n");

const getFirstNumberWithoutXMASProperty = (input, preambleLength) => {
  let sumMap = new Map(); // key: sum, value: # of occurrences
  let queue = [];
  for (let i = 0; i < input.length; i++) {
    const num = parseInt(input[i]);
    if (queue.length === preambleLength) {
      if (!sumMap.has(num)) return num;

      const dequeuedNum = queue.shift();
      queue.forEach((queuedNum) => {
        const sum = queuedNum + dequeuedNum;
        if (sumMap.get(sum) === 1) sumMap.delete(sum);
        else sumMap.set(sum, sumMap.get(sum) - 1);
      });
    }
    queue.forEach((queuedNum) => {
      const sum = queuedNum + num;
      if (sumMap.has(sum)) sumMap.set(sum, sumMap.get(sum) + 1);
      else sumMap.set(sum, 1);
    });
    queue.push(num);
  }
};

const getEncryptionWeakness = (input, preambleLength) => {
  const invalidNum = getFirstNumberWithoutXMASProperty(input, preambleLength);
  let sum = 0;
  let queue = [];
  for (let i = 0; i < input.length; i++) {
    const num = parseInt(input[i]);
    sum += num;
    queue.push(num);
    while (sum > invalidNum) {
      sum -= queue.shift();
      if (sum === invalidNum) return getSumOfSmallestAndLargestNumbers(queue);
    }
  }
};

const getSumOfSmallestAndLargestNumbers = (queue) => {
  const minMax = queue.reduce(
    (minMax, curr) => [Math.min(minMax[0], curr), Math.max(minMax[1], curr)],
    [Number.MAX_VALUE, Number.MIN_VALUE]
  );

  return minMax[0] + minMax[1];
};

console.log(getFirstNumberWithoutXMASProperty(input, 25));
console.log(getEncryptionWeakness(input, 25));
