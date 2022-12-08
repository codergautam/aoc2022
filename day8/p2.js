const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')
let cnt = 0;

let cache = {};
let maxScore = 0;
function isTreeVisible(i,i2) {

  if(i == 0 || i == input.length-1 || i2 == 0 || i2 == input[0].length-1) return true;
  let tScore = 1;
  let score = 0;
  // Get all trees going UP
  let visible = true;
  for(let j = i-1; j >= 0; j--) {
    score++;
    if(input[j][i2] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  tScore*= score;
  // get all trees going DOWN
  score = 0;
  for(let j = i+1; j < input.length; j++) {
    score++;
    if(input[j][i2] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  tScore*= score;
  // get all trees going LEFT
  score = 0;
  for(let j = i2-1; j >= 0; j--) {
    score++;
    if(input[i][j] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  tScore*= score;

  // get all trees going RIGHT
  score = 0;
  for(let j = i2+1; j < input[0].length; j++) {
    score++;
    if(input[i][j] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  tScore*= score;
  return tScore;


}

input.forEach((line,i) => {
  line.split("").forEach((tree, i2) => {
    tree = Number(tree);
    let s = isTreeVisible(i,i2);
    if(s > maxScore) {
      maxScore = s;
    }
  });
})

console.log(maxScore);

// console.log(isTreeVisible(2,1));