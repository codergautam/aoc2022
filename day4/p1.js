const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => {
  return line.split(',').map((item) => item.split('-').map((item) => parseInt(item)));
});

// check if a range goes into other range completely
function isInside(range1, range2) {
  return range1[0] >= range2[0] && range1[1] <= range2[1];
}

let cnt = 0;

input.forEach((line) => {
  const [range1, range2] = line;
  if (isInside(range1, range2) || isInside(range2, range1)) {
    cnt++;
  }
});

console.log(cnt)