const fs = require('fs');
function onlyNumbers(text){
  return parseInt(text.replace(/\D/g, ""));
}
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map((x) => {
  x = x.split(' ');

  return  [x[1], onlyNumbers(x[4]), x.slice(9).map((v)=>v.replace(",",""))]
})


let obj = {};
input.forEach((line, i) => {
  obj[line[0]] = line;
})

function findLowestDistance(line1, line2, visited = []) {
  line1 = obj[line1];
  line2 = obj[line2];

  visited.push(line1[0]);
  if(line1[2].includes(line2[0])) return visited;

  let choices = line1[2].filter((v)=>!visited.includes(v));
  choices = choices.map((v)=>findLowestDistance(v, line2[0], visited.slice(0)));
  return choices.sort((a,b)=>a.length-b.length)[0];

}

let lowestDistances = {};
let nonzero = input.filter((v)=>v[1]);
input.forEach((line, i) => {
  if(!line[1]) return;
  console.log(i+"/"+input.length);
  lowestDistances[line[0]] = {};
    input.forEach((line2, i2) => {
      if(!line2[1]) return;
      if(i2 == i) return lowestDistances[line[0]][line2[0]] = 0;
        let distance = findLowestDistance(line[0], line2[0]);
        if(distance) lowestDistances[line[0]][line2[0]] = distance.length;
    });
});


  let paths = [{name: "AA", time: 26, pressure: 0, placesToGo: nonzero.map((v)=>v[0]), path: []}];
  let out = [];

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    if(path.time <= 0) continue;

    let distances = lowestDistances[path.name];

    let stop = true;
    path.placesToGo.forEach((line) => {
      if(line == path.name) return;
      if(path.time-distances[line] <= 1) return;
      stop = false;
      paths.push({
        name: line,
        time: path.time-distances[line]-1,
        pressure: path.pressure + (path.time-distances[line]-1)*obj[line][1],
        placesToGo: path.placesToGo.filter((v)=>v!=line),
        path: [...path.path, line]
      });
    });
      if(stop) {
        maxPressure = path.pressure;
        out.push([path.path, path.pressure]);
      }
  }

//  // D,b,j,h,e,c
// console.log(out.sort((a,b)=>b[1]-a[1]));
// Get 2 best paths that dont have any same paths
out = out.sort((a,b)=>b[1]-a[1])
let max = 0;
out.forEach((v, i2) => {
 out.forEach((v2, i3) => {
    if(i2 == i3) return;
    let same = false;
    v[0].forEach((v3) => {
      if(v2[0].includes(v3)) same = true;
    });
    if(!same) {
      max = Math.max(v[1]+v2[1], max);
    }
 });
  });
  console.log(max);