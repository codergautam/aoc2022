const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n').map(group => group.split('\n'));
let all = [];
// sum each group
input.forEach(group => {
  let e = 0;
  group.forEach(n => {
    e += parseInt(n);
  });
  all.push(e);
});
// sort the array
all = all.sort((a, b) => a - b);
// sum top 3
all = all.slice(all.length - 3, all.length);
console.log(all.reduce((a, b) => a + b));