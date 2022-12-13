const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n').map((x) => x.split('\n'));

function compare([a,b]) {
  a = eval(a);
  b = eval(b);

  if(Number.isInteger(a) && Number.isInteger(b)) {
    if(a == b) return "same";
    if(a < b) return "yes";
    return "no";
  } else if(Array.isArray(a) && !Array.isArray(b)) {
    // console.log("a is number and b is not array");
    return compare([a, [b]]);
  } else if(Array.isArray(b) && !Array.isArray(a)) {
    // console.log("a is not array and b is number");
    return compare([[a], b]);
  } else if(Array.isArray(a) && Array.isArray(b)) {

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      let result = compare([a[i], b[i]]);
      if (result != "same") return result;
  }

  if (a.length < b.length) return "yes";
  else if (a.length > b.length) return "no";
  return "same";
}
}

let cnt = 0;
input.forEach((pair, i) => {
  if(compare(pair) == "yes") {
    cnt+=i+1;
  } else if(compare(pair) == "no") {
    // cnt-=i+1;
  } else {
    console.log("Same", pair, i);
  }
});
console.log(cnt);