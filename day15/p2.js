const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((x) => {
  x = x.split(' ');
  x = x.map((t) => {
    return t.startsWith("x=") ? t.replace("x=", "") : t.startsWith("y=") ? t.replace("y=", "") : "";
  }).filter((t) => {
    return t != "";
  }).map((t) => {
    if (t.charAt(t.length - 1) == ":") t = t.substring(0, t.length - 1);
    return parseInt(t);
  });
  return x
})

function dist(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
function findMissingPoint(ranges, y) {
  // Sort the ranges by their starting point
  ranges.sort((a, b) => a[0] - b[0]);

  let maxSoFar = ranges[0][1];
  // start from 2nd range
  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i][0] - 1 <= maxSoFar) {
      maxSoFar = Math.max(maxSoFar, ranges[i][1]);
    } else {
      return maxSoFar+1;
    }
  }
}
function calcRadius([sensorX, sensorY, beaconX, beaconY], row) {
  let minDistance = dist(sensorX, sensorY, beaconX, beaconY);
  return minDistance - Math.abs(row - sensorY);
}
for (let y = 0; y <= 4000000; y++) {
  // checking each row
  ranges = [];
  for (line of input) {
    let radius = calcRadius(line, y);

    if (radius < 0) continue;

    ranges.push([line[0] - radius, line[0] + radius]);
  }
  let m = findMissingPoint(ranges, y);
  if (m) {
    console.log((m * 4000000) + y)
    break;
  }
}
