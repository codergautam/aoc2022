const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let sandSource = [500, 0];
let map = {};

input.forEach((line) => {
  line = line.split(' -> ');
  let prevPart = line[0].split(',').map((x) => Number(x.trim()));
  line.forEach((part) => {
    part = part.split(',').map((x) => Number(x.trim()));
    for(let i = Math.min(prevPart[0], part[0]); i <= Math.max(prevPart[0], part[0]); i++) {
      map[`x${i}y${part[1]}`] = "rock";
    }
    for(let i = Math.min(prevPart[1], part[1]); i <= Math.max(prevPart[1], part[1]); i++) {
      map[`x${part[0]}y${i}`] = "rock";
    }
    prevPart = part;
  });
});

let sandAdded = 0;
let voided = false;
function dropSand(x, y) {
  map[`x${x}y${y}`] = "sand1";
  sandAdded++;
}

let fallingSand = undefined;

function tick() {
  if(!fallingSand) {
    dropSand(sandSource[0], sandSource[1]);
    fallingSand = `x${sandSource[0]}y${sandSource[1]}`
  } else {
    let sand = fallingSand;
    let pos = sand.split('y');
    let x = Number(pos[0].slice(1));
    let y = Number(pos[1]);
    if(y > 2000) {
      voided = true;
      return;
    }
    // check if pos below is empty
    const dirs = [[0, 1], [-1, 1], [1, 1]];
    let moved = false;
    for(let dir of dirs) {
      if(map[`x${x+dir[0]}y${y+dir[1]}`] == undefined) {
    map[`x${x+dir[0]}y${y+dir[1]}`] = "sand1";
    fallingSand = `x${x+dir[0]}y${y+dir[1]}`;
    moved = true;
      delete map[sand];
      break;
      }
    }
    if(!moved) {
      // set sand1 to sand
      map[sand] = "sand";
      fallingSand = undefined;
    }
  }
}

while(!voided) {
  tick();
}
console.log(sandAdded-1);