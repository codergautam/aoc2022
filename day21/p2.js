const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split('\n').map(x => x.split(' '))
let inp = {};

for (let i = 0; i < input.length; i++) {
    let line = input[i];
    inp[line[0].slice(0, -1)] = line.slice(1);
}
let save = {};
function trace(str) {
    let find = inp[str];
    if(save[str]) return save[str];
    if(find.length == 1) return parseInt(find[0]);
    else {
        let [a,op,b] = find;

        if(a != "humn") a = trace(a);
        else a = "x"
        if(b != "humn") b = trace(b);
        else b = "x"

        return `(${a}${op}${b})`;
    }
}
let [a,_,b] = inp["root"];
console.log("\nP2 EQUATION START:\n")
console.log(trace(a)+"="+trace(b));
console.log("\nYou have to solve the above equation put it in like mathpapa.com or smth, x is the answer")