const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

console.log(input)

function checkwin(s) {
  // check if both same
  const conv = {
    'A': 'r',
    'B': 'p',
    'C': 's',
    'X': 'lose',
    'Y': 'draw',
    'Z': 'win'
  }
  const a = {
    'r': 1,
    'p': 2,
    's': 3,
  }
  s = s.map(x => conv[x]);
  if(s[1] == 'draw') {
    return a[s[0]];
  }
  if(s[1] == 'win') {
    if(s[0] == 'r') return 2;
    if(s[0] == 'p') return 3;
    if(s[0] == 's') return 1;
  }
  if(s[1] == 'lose') {
    if(s[0] == 'r') return 3;
    if(s[0] == 'p') return 1;
    if(s[0] == 's') return 2;
  }

}

function calcScore(s) {
  s = s.split(' ');
  const vals = {
    'X': 0,
    'Y': 3,
    'Z': 6,
  }
  console.log(checkwin(s) +'+'+ vals[s[1]])
  return checkwin(s) + vals[s[1]];
}
let t = 0;
input.forEach(x => {
  // console.log(calcScore(x))
  t += calcScore(x);
})
console.log(t);