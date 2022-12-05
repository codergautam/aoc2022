const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let crates = {};
function splitNChars(txt, num) {
  var result = [];
  for (var i = 0; i < txt.length; i += num) {
    result.push(txt.substr(i, num));
  }
  return result;
}
input.forEach((line) => {
  if(line.startsWith("move")) {
    console.log(line)
    let [_, cnt, __, from, ___, to] = line.split(" ")
    cnt = parseInt(cnt)
    from = parseInt(from)
    to = parseInt(to)

    let toMove = [];
    for(let i = 0; i < cnt; i++) {
      toMove.push(crates[from+"cr"].shift())
    }
    toMove.reverse().forEach((item) => {
      crates[to+"cr"].unshift(item)
    })


  } else if(line.length == 0) {
    // console.log("empty")
  } else if(line.startsWith(' 1')) {

  } else {
    splitNChars(line,4).forEach((item,i) => {
      if(item.trim() == "") return;
      if(!crates[(i+1)+"cr"]) crates[(i+1)+"cr"] = []
      crates[(i+1)+"cr"].push(item[1])
    });
  }
});
// console.log(crates)

let a = "";
for ( var i =0; i < Object.values(crates).length;i++) {
  a+= crates[(i+1)+'cr'][0]
}
console.log(a)