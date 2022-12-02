const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

console.log(input)

function checkwin(s) {
  // check if both same
  const conv = {
    'A': 'r',
    'B': 'p',
    'C': 's',
    'X': 'r',
    'Y': 'p',
    'Z': 's'
  }
  s = s.map(x => conv[x]);
  if(s[0] == s[1]) return 3;
  if(s[0] == 'r' && s[1] == 's') return 0;
  if(s[0] == 's' && s[1] == 'p') return 0;
  if(s[0] == 'p' && s[1] == 'r') return 0;
  return 6;

}

function calcScore(s) {
  s = s.split(' ');
  const vals = {
    'X': 1,
    'Y': 2,
    'Z': 3,
  }
  return checkwin(s) + vals[s[1]];
}
let t = 0;
input.forEach(x => {
  t += calcScore(x);
})
console.log(t);