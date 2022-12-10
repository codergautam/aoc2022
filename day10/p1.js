const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let x = 1;
let cycles = 0;
let data = [];

function check() {
  if(cycles > 0 && (cycles == 20 || (cycles+20) % 40 == 0)) {
    data.push({x, cycles});
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

data = data.map((x) => x.x * x.cycles);
console.log(data.reduce((a, b) => a + b, 0));