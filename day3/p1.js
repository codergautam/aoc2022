const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')
let aa = 0;
input.forEach((x,i) => {
  // split string in half
  const a = x.slice(0, x.length/2);
  const b = x.slice(x.length/2);
  // find chars that are the same
  let c = a.split('').filter((x, i) => b.includes(x));
 // lowercase chars are 1-26
 // uppercase chars are 27-52
 let letters = [...Array(26).keys()].map(x => String.fromCharCode(x+97));
 let letters2 = letters.concat(letters.map(x => x.toUpperCase()));
 aa += (c.map(x => letters2.indexOf(x)+1)[0])
});
console.log(aa);