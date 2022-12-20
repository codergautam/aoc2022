const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split('\n').map((e,i)=>{return{n:Number(e)*811589153,i}})

function move(arr, index, newIndex) {
  const element = arr[index]
  arr.splice(index, 1)
  arr.splice((index + element.n) % arr.length, 0, element)
}
function mix(inp) {
    const mixed = [...inp]
    for(let i = 0; i < 10; i++){
        for (const n of inp) {
            const curIndx = mixed.findIndex(({ i }) => i === n.i)
            move(mixed, curIndx)
        }
    }
    const zero = mixed.findIndex(({ n }) => n === 0)
    const numbers = [1000, 2000, 3000]
    let a = 0;
    numbers.forEach((k) => {
     a+=mixed[(zero + k) % mixed.length].n
    });
    return a;
}

console.log(mix(input))