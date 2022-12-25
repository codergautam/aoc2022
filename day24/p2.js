// somethings not right.... my other solution works for some reason but this one doesnt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x => x.split(""))

let mapWidth = input[0].length  - 2;
let mapHeight = input.length - 2;

let map = {};
let walls = {};
input.forEach((row, y) => {
    row.forEach((col, x) => {
       if(col != "#" && col != ".") map[x+","+y] = [col];
    })
})
let cnt = 0;

function updateMap() {
    cnt++;
    let newMap = {};
    Object.keys(map).forEach(pos => {
        let [x, y] = pos.split(",").map(x => parseInt(x));
        let blizzards = map[pos];
        blizzards.forEach(blizzard => {
            let newPos = [x, y];
            if(blizzard == "v") newPos[1]++;
            if(blizzard == "^") newPos[1]--;
            if(blizzard == ">") newPos[0]++;
            if(blizzard == "<") newPos[0]--;

            // wrap around
            if(newPos[0] <= 0) newPos[0] = mapWidth;
            if(newPos[0] > mapWidth) newPos[0] = 1;
            if(newPos[1] <= 0) newPos[1] = mapHeight;
            if(newPos[1] > mapHeight) newPos[1] = 1;

            if(newPos[0] == 0) {
                throw "error";
            }

            if(!newMap[newPos.join(",")]) newMap[newPos.join(",")] = [];
            newMap[newPos.join(",")].push(blizzard);
        });
    });
    map = newMap;
}

let startX = 1;
let startY = 0;
let endX = mapWidth;
let endY = mapHeight+1;

// BFS to find shortest path from start to end without going through a blizzard


function addWalls() {
    for(let y = 0; y <= mapHeight+1; y++) {
        for(let x = 0; x <= mapWidth+1; x++) {
             if((x > 0 && x <= mapWidth && y <= mapHeight && y > 0) || (x == startX && y == startY) || (x == endX && y == endY)) {
             } else{
                    walls[x+","+y] = true;
             }

        }
    }

    // start
    walls[(startX-1)+","+(startY-1)] = true;  // start top left
    walls[(startX)+","+(startY-1)] = true;  // start top
    walls[(startX+1)+","+(startY-1)] = true;  // start top right

    // end
    walls[(endX-1)+","+(endY+1)] = true;  // end bottom left
    walls[(endX)+","+(endY+1)] = true;  // end bottom
    walls[(endX+1)+","+(endY+1)] = true;  // end bottom right

}
addWalls();


function find(startX, startY, endX, endY) {
let queue = new Set();
queue.add(startX+","+startY+","+0);
let queue2 = new Set();
let visited = {}
while (queue.size) {
    for (let state of queue) {
        let [x, y, steps] = state.split(",").map(x => parseInt(x));
        // console.log(x, y, steps);
        if (!visited[x+","+y] && !map[x+","+y] && !walls[x+","+y]) {
            let dirs = [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]];
            for (let dir of dirs) {
                let newX = x + dir[0];
                let newY = y + dir[1];
                if (!walls[newX+","+newY] && !visited[newX+","+newY]) {
                    queue2.add(newX+","+newY+","+(steps+1));
                }
            }

        }
        // check if we found the end
        if (x == endX && y == endY) {
            console.log("found end", steps);
            return steps;
        }
        visited[x+","+y] = true
    }
    queue = queue2
    queue2 = new Set()
    updateMap()
    visited = {}
}
}

let p1 = find(startX, startY, endX, endY);
// now go back up
let up = find(endX, endY, startX, startY);
// go back down
let p2 = find(startX, startY, endX, endY);

console.log(p1, up, p2, p1+up+p2, cnt);
