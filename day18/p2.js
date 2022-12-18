let cubes = {};
let inp = require('fs').readFileSync('input.txt').toString().split('\n');

// Why 20? Because I was eyeing my input and it didnt seem to go above 19
for (let z = 0; z <= 20; z++) {
    for (let y = 0; y <= 20; y++) {
        for (let x = 0; x <= 20; x++) {
            cubes[`${x},${y},${z}`] = inp.includes(`${x},${y},${z}`);
        }
    }
}

const deleteSides = (position) => {
  cubes[`${position.x},${position.y},${position.z}`] = null;

  const positionsToCheck = [
    { x: position.x + 1, y: position.y, z: position.z },
    { x: position.x - 1, y: position.y, z: position.z },
    { x: position.x, y: position.y + 1, z: position.z },
    { x: position.x, y: position.y - 1, z: position.z },
    { x: position.x, y: position.y, z: position.z + 1 },
    { x: position.x, y: position.y, z: position.z - 1 },
  ];

  for (const pos of positionsToCheck) {
    if (cubes[`${pos.x},${pos.y},${pos.z}`] === false) {
      deleteSides(pos);
    }
  }
}

deleteSides({ x: 0, y: 0, z: 0 });

let p2 = 0;
Object.keys(cubes).forEach(position => {
  if (cubes[position] == null) return;

  let cube = position.split(',').map(num => parseInt(num));

  // sides
  if(cubes[`${cube[0] + 1},${cube[1]},${cube[2]}`] == null) p2++;
  if(cubes[`${cube[0] - 1},${cube[1]},${cube[2]}`] == null) p2++;
  if(cubes[`${cube[0]},${cube[1] + 1},${cube[2]}`] == null) p2++;
  if(cubes[`${cube[0]},${cube[1] - 1},${cube[2]}`] == null) p2++;
  if(cubes[`${cube[0]},${cube[1]},${cube[2] + 1}`] == null) p2++;
  if(cubes[`${cube[0]},${cube[1]},${cube[2] - 1}`] == null) p2++;

});
console.log(p2);