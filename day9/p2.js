const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

function isTouching(headPos, tailPos) {
  // touching diagonal
  if(Math.abs(headPos[0] - tailPos[0]) <= 1 && Math.abs(headPos[1] - tailPos[1]) <= 1) {
    return true;
  }
}

function move(dir, knotsPos) {
  let oldKnotsPos = JSON.parse(JSON.stringify(knotsPos));
  if(dir === 'U') {
    knotsPos[0][1] += 1;
  } else if(dir === 'D') {
    knotsPos[0][1] -= 1;
  } else if(dir === 'L') {
    knotsPos[0][0] -= 1;
  } else if(dir === 'R') {
    knotsPos[0][0] += 1;
  }

  for(let i = 0; i < knotsPos.length-1; i++) {
    if(!isTouching(knotsPos[i], knotsPos[i + 1])) {
    let x = knotsPos[i][0] - knotsPos[i + 1][0];
    let y = knotsPos[i][1] - knotsPos[i + 1][1];
        if(x > 0) {
          knotsPos[i + 1][0] += 1;
        } else if (x < 0) {
          knotsPos[i + 1][0] -= 1;
        }


        if(y > 0) {
          knotsPos[i + 1][1] += 1;
        } else if (y < 0) {
          knotsPos[i + 1][1] -= 1;
        }
  }
  }
  return [knotsPos];
}
let knotsPos = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
let places = new Set();
input.forEach((line, i) => {
  const [dir, steps] = line.split(' ');

  for(let i = 0; i < steps; i++) {
    [knotsPos] = move(dir, knotsPos);
    places.add(JSON.stringify(knotsPos[knotsPos.length-1]));
  }

});
console.log(places.size);

