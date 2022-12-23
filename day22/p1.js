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
    let [newX, newY] =  JSON.parse(JSON.stringify(pos))

    if(newY < 0 || (facing == 3 && (path[newY][newX] == " " || !path[newY][newX]))) {
        newY = path.length - 1;
        while(path[newY][newX] == " " || !path[newY][newX]) newY--;
    }

    if(newY >= path.length || (facing == 1 && (path[newY][newX] == " " || !path[newY][newX]))) {
        newY = 0;
        while(path[newY][newX] == " " || !path[newY][newX]) newY++;
    }

    if(newX < 0 || (facing == 2 && (path[newY][newX] == " " || !path[newY][newX]))) {
        newX = path[0].length - 1;
        while(path[newY][newX] == " " || !path[newY][newX]) newX--;
    }

    if(newX >= path[0].length || (facing == 0 && (path[newY][newX] == " " || !path[newY][newX]))) {
        newX = 0;
        while(path[newY][newX] == " " || !path[newY][newX]) newX++;
    }

    return [newX, newY];
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
            if(facing == 0) newPos[0]++;
            else if(facing == 1) newPos[1]++;
            else if(facing == 2) newPos[0]--;
            else if(facing == 3) newPos[1]--;

            newPos = wrap(newPos);


            if(path[newPos[1]][newPos[0]] == "#") {
                // console.log("BROKEN");
                break;
            }

            x = newPos[0];
            y = newPos[1];

            if(path[y][x] === undefined) throw new Error("undefined at " + x + ", " + y);
            // console.log(x, y, facing, path[y][x]);
        }
    }
});

console.log(1000*(y+1)+4*(x+1)+facing)