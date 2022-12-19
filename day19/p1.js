const inp = require("fs").readFileSync("input.txt", "utf8").split("\n").map((e) => e.split(" ").filter((n) => parseInt(n)).map((n) => parseInt(n)))

// tweak these values based on your input
let pruneVals = [10, 100, 1000]
// lower prunecnt = faster, but less accurate
let pruneCnt = 200

function solve(robotCost ) {

    let queue = [[0, [1,0,0,0], [0,0,0,0], [0,0,0,0]]];
    let max = 0;
    let lastPruned = 0;

    while(queue.length > 0) {
        let [mins, robotBal, balance, total] = queue.shift();

        if(mins > lastPruned) {
            lastPruned = mins;
            queue = queue.sort((a,b) => (b[3][0] + (b[3][1] * pruneVals[0]) + (b[3][2] * pruneVals[1]) + (b[3][3] * pruneVals[2])) - (a[3][0] + (a[3][1] * pruneVals[0]) + (a[3][2] * pruneVals[1]) + (a[3][3] * pruneVals[2]))).slice(0, pruneCnt);
        }

        if(mins == 24) {
            let geode = total[3]
            if(geode > max) max = geode;
            continue
        }

        totalNow = total.map((e,i) => e + robotBal[i]);
        balanceNow = balance.map((e,i) => e + robotBal[i]);

        queue.push([mins+1, robotBal, balanceNow, totalNow]);

        for(let i = 0; i < robotCost.length; i++) {
            let cost = robotCost[i];
            if(balance.every((e,i2) => e >= cost[i2])) {
                let newRobotBal = [...robotBal];
                newRobotBal[i] += 1;
                let newBalance = balanceNow.map((e,i2) => e - cost[i2]);
                queue.push([mins+1, newRobotBal, newBalance, totalNow]);
            }
        }
    }
    return max;
}

// order: ore, clay, obsidian, geode
let a = 0
inp.forEach((e,i) => {

let robots = [[e[1], 0, 0, 0], [e[2], 0, 0, 0], [e[3], e[4], 0, 0], [e[5], 0, e[6], 0]];
// console.log(oreCost)
let s = solve(robots)
console.log(i+1, s)
a+=(i+1)*s
});

console.log("p1", a)

