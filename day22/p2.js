const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")
// split where there is a blank line
const path = input.slice(0, input.indexOf("")).map((line) => line.split(""))
let dinput = input.slice(input.indexOf("") + 1)[0]
let directions = [];
for (let i = 0; i < dinput.length; i++) {
    let char = dinput[i];
    let prevChar = i !== 0 ? dinput[i - 1] : "";
    if(prevChar === "") directions.push(char);
    else if(isNaN(parseInt(char)) == isNaN(parseInt(prevChar))) directions[directions.length - 1] += char;
    else directions.push(char);
}

let x = path[0].findIndex((c) => c === ".");
let y = 0
let facing = 0; // right, down, left, up

function wrap(pos) {
    let [nextX, nextY] =  JSON.parse(JSON.stringify(pos))

    if(facing == 0) nextX++;
    else if(facing == 1) nextY++;
    else if(facing == 2) nextX--;
    else if(facing == 3) nextY--;

    if(path[nextY]?.[nextX] == " " || !path[nextY]?.[nextX]) {
        if(facing == 0) {
            // right
            if(nextY < 50) {
                return [99, 149 - nextY, 2];
            } else if(nextY < 100) {
                return [nextY + 50, 49, 3];
            } else if(nextY < 150) {
                return [149, 149 - nextY, 2];
            } else if(nextY < 200) {
                return [nextY - 100, 149, 3];
            }
        } else if(facing == 1) {
            // down
            if(nextX < 50) {
                return [nextX + 100, 0, 1];
            } else if(nextX < 100) {
                return [49, nextX + 100, 2];
            } else if(nextX < 150) {
                return [99, nextX - 50, 2];
            }


        } else if(facing == 2) {
            // left
            if(nextY < 50) {
                return [0, 149 - nextY, 0];
            }
            else if(nextY < 100) {
                return [nextY - 50, 100, 1];
            }
            else if(nextY < 150) {
                return [50, 149 - nextY, 0];
            }
            else if(nextY < 200) {
                return [nextY - 100, 0, 1];
            }
        } else if(facing == 3) {
            // up
            if(nextX < 50) {
                return [50, nextX + 50, 0];
            }
            else if(nextX < 100) {
                return [0, nextX + 100, 0];
            }
            else if(nextX < 150) {
                return [nextX - 100, 199, 3];
            }
        }

    } else {
        return [nextX, nextY, facing];
    }
}

directions.forEach((dir) => {
    if(dir == "R") {
        // rotate clockwise 90 degrees
        facing = ((facing + 1)+4) % 4;
    } else if(dir == "L") {
        // rotate counter-clockwise 90 degrees
        facing = ((facing - 1)+4) % 4;
    } else {
        // console.log("new dir",dir,"facing",facing )
        for(var i = 0; i < parseInt(dir); i++) {
            let newPos = [x, y];


            newPos = wrap(newPos);


            if(path[newPos[1]][newPos[0]] == "#") {
                break;
            }
            x = newPos[0];
            y = newPos[1];
            facing = newPos[2];

            if(path[y][x] === undefined) throw new Error("undefined at " + x + ", " + y);
            // console.log(x, y, facing, path[y][x]);
        }
    }
});

console.log(1000*(y+1)+4*(x+1)+facing)