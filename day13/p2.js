const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').split('\n').filter((x) => x != "")
input.push("[[2]]", "[[6]]");

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

input = input.sort((a,b) => {
  return compare([a,b]) == "yes" ? -1 : 1;
})
console.log((input.findIndex((x) => x == "[[2]]") + 1)* (input.findIndex((x) => x == "[[6]]") + 1));