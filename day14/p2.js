const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let sandSource = [500, 0];
let map = {};
let highestY = 0;

function setInMap(x,y,val) {
  if(map[x+"x"] == undefined) map[x+"x"] = {};
  map[x+"x"][y+"y"] = val;
}

input.forEach((line) => {
  line = line.split(' -> ');
  let prevPart = line[0].split(',').map((x) => Number(x.trim()));
  line.forEach((part) => {
    part = part.split(',').map((x) => Number(x.trim()));
    for(let i = Math.min(prevPart[0], part[0]); i <= Math.max(prevPart[0], part[0]); i++) {
      setInMap(i, part[1], "rock");
      if(part[1] > highestY) highestY = part[1];
    }
    for(let i = Math.min(prevPart[1], part[1]); i <= Math.max(prevPart[1], part[1]); i++) {
      setInMap(part[0], i, "rock");
      if(part[1] > highestY) highestY = part[1];

    }
    prevPart = part;
  });
});

let sandAdded = 0;
let voided = false;
function dropSand(x, y) {
  setInMap(x, y, "sand1");
  sandAdded++;
}
function getInMap(x,y) {
  if(map[x+"x"] == undefined) return undefined;
  return map[x+"x"][y+"y"] == undefined ? undefined : map[x+"x"][y+"y"];
}
let fallingSand = undefined;
function tick() {
  if(!fallingSand) {
    dropSand(sandSource[0], sandSource[1]);
    fallingSand = `x${sandSource[0]}y${sandSource[1]}`
  } else {
    let sand = (fallingSand);
    let pos = sand.split('y');
    let x = Number(pos[0].slice(1));
    let y = Number(pos[1]);
    // check if pos below is empty
    const dirs = [[0, 1], [-1, 1], [1, 1]];
    let moved = false;
    if(y+1 <= highestY+1) {
    for(let dir of dirs) {
      if(getInMap(x+dir[0],y+dir[1])== undefined) {
    setInMap(x+dir[0],y+dir[1], "sand1");
    fallingSand = `x${x+dir[0]}y${y+dir[1]}`;
    moved = true;
      delete map[x+"x"][y+"y"];
      break;
      }
    }
  }
    if(!moved) {
      // set sand1 to sand
      setInMap(x,y, "sand");
      fallingSand = undefined;
      // check if 500,500
      if(x == 500 && y == 0) {
        voided = true;
      }
    }
  }
}

while(!voided) {
  tick();
  // console.log(sandAdded-1)
}
console.log(sandAdded);

// console.log(map);