const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")

let elfpos = {};
input.forEach((line, i) => {
    line.split("").forEach((char, j) => {
        if(char == "#") {
            elfpos[j+","+i] = true;
        }
    });
});

function round(c) {
    let proposed = {};
    Object.keys(elfpos).forEach((pos) => {
        let [x, y] = pos.split(",").map((n) => parseInt(n));
        // check if there is an elf in the 8 surrounding squares
        let count = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        dirs.forEach((dir) => {
            if(elfpos[(x+dir[0])+","+(y+dir[1])]) {
                count++;
            }
        });
        if(count == 0) return;
        // n, ne, or nw
        let proposedOne = [[x, y-1], [x+1, y-1], [x-1, y-1]];
        // s, se, or sw
        let proposedTwo = [[x, y+1], [x+1, y+1], [x-1, y+1]];
        // w, nw, or sw
        let proposedThree = [[x-1, y], [x-1, y-1], [x-1, y+1]];
        // e, ne, or se
        let proposedFour = [[x+1, y], [x+1, y-1], [x+1, y+1]];

        let allProposed = [proposedOne, proposedTwo, proposedThree, proposedFour];
        for(let i = 0; i < c; i++) {
            // take the first proposed and append it at end
            let first = allProposed.shift();
            allProposed.push(first);
        }


        let thisproposed = false;
        allProposed.forEach((proposedDir, i) => {
            if(thisproposed) return;
            let noElf = proposedDir.every((pos) => {
                return !elfpos[pos[0]+","+pos[1]];
            });
            if(noElf) {
                const pString = proposedDir[0][0]+","+proposedDir[0][1];
                if(!proposed[pString]) proposed[pString] = [];
                proposed[pString].push(pos);
                thisproposed = true;
            }
        });
    });

    Object.keys(proposed).forEach((pos) => {
        let elvesWantingToMove = proposed[pos];
        if(elvesWantingToMove.length == 1) {
            let elf = elvesWantingToMove[0];
            delete elfpos[elf];
            elfpos[pos] = true;
        }
    });
}

for(let i = 0; i < 10; i++) {
    round(i);
}
// calculate min and max x and y
let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
Object.keys(elfpos).forEach((pos) => {
    let [x, y] = pos.split(",").map((n) => parseInt(n));
    if(x < minX) minX = x;
    if(x > maxX) maxX = x;
    if(y < minY) minY = y;
    if(y > maxY) maxY = y;
});
let empty = 0;
for(let y = minY; y <= maxY; y++) {
    let line = "";
    for(let x = minX; x <= maxX; x++) {
        if(elfpos[x+","+y]) {
            line += "#";
        } else {
            line += ".";
            empty++;
        }
    }
    console.log(line);
}

console.log("p1", empty);