const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')
let cnt = 0;

let cache = {};

function isTreeVisible(i,i2) {

  if(i == 0 || i == input.length-1 || i2 == 0 || i2 == input[0].length-1) return true;

  // Get all trees going UP
  let visible = true;
  for(let j = i-1; j >= 0; j--) {
    if(input[j][i2] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  if(visible) return true;
  visible = true;

  // Get all trees going DOWN
  for(let j = i+1; j < input.length; j++) {
    if(input[j][i2] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  if(visible) return true;
  visible = true;


  // Get all trees going LEFT
  for(let j = i2-1; j >= 0; j--) {
    if(input[i][j] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  if(visible) return true;

  visible = true;

  // Get all trees going RIGHT
  for(let j = i2+1; j < input[0].length; j++) {
    if(input[i][j] >= input[i][i2]) {
      visible = false;
      break;
    }
  }

  return visible;


}

input.forEach((line,i) => {
  line.split("").forEach((tree, i2) => {
    tree = Number(tree);
    if(isTreeVisible(i,i2)) {
      cnt += 1;
  if(!(i == 0 || i == input.length-1 || i2 == 0 || i2 == input[0].length-1)) return console.log("visible", i, i2);

    }
  });
})

console.log(cnt);

// console.log(isTreeVisible(2,1));