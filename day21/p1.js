const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split('\n').map(x => x.split(' '))
let inp = {};

for (let i = 0; i < input.length; i++) {
    let line = input[i];
    inp[line[0].slice(0, -1)] = line.slice(1);
}
let save = {};
function solve(str) {
    let find = inp[str];
    if(save[str]) return save[str];
    if(find.length == 1) return parseInt(find[0]);
    else {
        let [a,op,b] = find;
         a = solve(a);
         b = solve(b);
        if(op == "+") return save[str] = a + b;
        else if(op == "*") return save[str] = a * b;
        else if(op == "/") return save[str] = a / b;
        else if(op == "-") return save[str] = a - b;
    }
}
console.log(solve("root"));