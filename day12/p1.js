const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((x) => x.split(''));

function isSmallerOrSameLetter(a, b) {
  if(a == "S") a = "a";
  if(b == "S") b = "a";
  if(b == "E") b = "z";
  if(a == "E") a = "z";
  return a.charCodeAt(0)-1 <= b.charCodeAt(0);
}
console.log(isSmallerOrSameLetter("b", "a"));
let queue = [];
let seen = [];
function findDirs(row, col) {
  return [
    [row, col+1],
    [row+1, col],
    [row, col-1],
    [row-1, col]
  ]
}
input.forEach((line, i) => {
  line.forEach((char, j) => {
    if(char == "S") queue.push([i, j, 0]);
  });
});

while(queue.length > 0) {
  let [row, col, steps] = queue.shift();
  if(seen.includes(row + "," + col)) continue;
  if(input[row][col] == "E") {
    console.log(steps);
    break;
  }
  for(dir of findDirs(row, col)) {
    let [r, c] = dir;
    if(input[r] && input[r][c] && isSmallerOrSameLetter(input[r][c], input[row][col])  && !seen.includes(r + "," + c)) {
      queue.push([r, c, steps+1]);
    }
  }
  seen.push(row + "," + col);
}

// let arr = a.sort((a, b) => a.l-b.l)[0]
// console.log(arr.l);
