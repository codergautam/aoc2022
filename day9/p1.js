const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

function isTouching(headPos, tailPos) {
  // touching diagonal
  if(Math.abs(headPos[0] - tailPos[0]) <= 1 && Math.abs(headPos[1] - tailPos[1]) <= 1) {
    return true;
  }
}

function move(dir, headPos, tailPos) {
  let oldHeadPos = JSON.parse(JSON.stringify(headPos));
  if(dir === 'U') {
    headPos[1] += 1;
  } else if(dir === 'D') {
    headPos[1] -= 1;
  } else if(dir === 'L') {
    headPos[0] -= 1;
  } else if(dir === 'R') {
    headPos[0] += 1;
  }

  if(!isTouching(headPos, tailPos)) {
    tailPos = oldHeadPos;
  }
  return [headPos, tailPos];
}
let headPos = [0, 0];
let tailPos = [0, 0];
let places = new Set();
input.forEach((line, i) => {
  const [dir, steps] = line.split(' ');

  for(let i = 0; i < steps; i++) {
    [headPos, tailPos] = move(dir, headPos, tailPos);
    places.add(JSON.stringify(tailPos));
  }

});
console.log(places.size);

