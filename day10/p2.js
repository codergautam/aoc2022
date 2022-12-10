const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let x = 1;
let cycles = 0;
let data = [];

function check() {
  if((cycles-1) % 40 == 0) {
    data.push([]);
  }
  let row = data[data.length-1];
  let position = row.length;
  if(Math.abs(position - x) <= 1) {
    row.push("#");
  } else {
    row.push(" ");
  }
}
input.forEach((line, i) => {
  line = line.split(' ');
  if(line[0] == "noop") {
    cycles ++;
    check();
  }
  else if(line[0] == "addx") {
    cycles += 1
    check();
    cycles += 1
    check();
    x += (parseInt(line[1]));

  }
});

data.forEach((row) => {
  console.log(row.join(""));
});