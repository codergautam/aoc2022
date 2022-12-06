const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('')
let f = false;
input.forEach((char,i) => {
  // check past 4 chars
  let past4 = input.slice(i-14,i)
  if(past4.length < 14) return;
  let past4Str = past4.join('')
  // check if 4 are all different
  if(past4Str.length != new Set(past4Str).size || f) return;
  console.log(i)
  f = true;
});

console.log(input)