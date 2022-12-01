const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n').map(group => group.split('\n'));
let highest = 0;
// sum each group
input.forEach(group => {
  let e = 0;
  group.forEach(n => {
    e += parseInt(n);
  });
  if (e > highest) {
    highest = e;
  }
});
console.log(highest);

