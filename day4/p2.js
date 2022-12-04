const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => {
  return line.split(',').map((item) => item.split('-').map((item) => parseInt(item)));
});

// check if a range overlaps with other range
function isOverlapping(range1, range2) {
  return range1[0] <= range2[1] && range1[1] >= range2[0];
}

let cnt = 0;

input.forEach((line) => {
  const [range1, range2] = line;
  if (isOverlapping(range1, range2) || isOverlapping(range2, range1)) {
    cnt++;
  }
});

console.log(cnt)