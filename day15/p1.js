const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((x) => {
  x = x.split(' ');
  x = x.map((t) => {
    return t.startsWith("x=") ? t.replace("x=", "") : t.startsWith("y=") ? t.replace("y=", "") : "";
  }).filter((t) => {
    return t != "";
  }).map((t) => {
    if(t.charAt(t.length-1) == ":") t = t.substring(0, t.length-1);
    return parseInt(t);
  });
  return x
})

function getPointsWithinDistance(point, distance) {
  // Initialize an empty array to store the points
  const points = [];

  // Loop through all integer values of x and y within the specified distance
    for (let y = point.y - distance; y <= point.y + distance; y++) {
      if(y != row) continue;

  for (let x = point.x - distance-1; x <= point.x + distance+1; x++) {

      // Calculate the Manhattan distance between the point and the current coordinates
      const manhattanDistance = distanceFormula(point.x, point.y, x, y);

      // If the distance is less than or equal to the specified distance, add the coordinates to the array
      if (manhattanDistance <= distance) {
        points.push({x, y});
      }
    }
  }

  // Return the array of points
  return points;
}


let row = 2000000;
let a = 0;
let p = new Set();
let occupied = new Set();
function distanceFormula(x1, y1, x2, y2) {
  // return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
input.forEach((line, i) => {
  let [sensorX, sensorY, beaconX, beaconY] = line;
  let distance = distanceFormula(sensorX, sensorY, beaconX, beaconY);
  // get every point with same distance
  // if(!occupied[sensorX+"x"]) occupied[sensorX+"x"] = {};
  if(sensorY == row) occupied.add(sensorX);
  if(beaconY == row) occupied.add(beaconX);

  let points = [];
  getPointsWithinDistance({x: sensorX, y: sensorY}, distance).forEach((point) => {
   if(point.y == row && !p.has(point.x)) {
     p.add(point.x);
     a++;
   }
  })



});

console.log(p.size-occupied.size);