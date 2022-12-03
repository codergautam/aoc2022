const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')
let aa = 0;
input.forEach((x,i) => {
  // check if multiple of 3
  if(i % 3 == 0) {
    // get next 3
    const a = x.split('');
    const b = input[i+1].split('');
    const c = input[i+2].split('');
    // find common in each
    const common = a.filter(x => b.includes(x) && c.includes(x));
    let letters = [...Array(26).keys()].map(x => String.fromCharCode(x+97));
    let letters2 = letters.concat(letters.map(x => x.toUpperCase()));
    aa+=letters2.findIndex(x => x == common[0])+1;
  }

});
console.log(aa);