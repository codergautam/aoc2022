const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let parsed = [];

input.forEach((line, i) => {
  line = line.trim();
  linesplitted = line.split(' ');
  if(line.startsWith("Monkey")) {
    parsed.push({id: linesplitted[1].replace(":", "")})
  } else if(line.startsWith("Starting items: ")) {
    let removed = linesplitted.slice(2);
    parsed[parsed.length-1].startingItems = removed.map((x) => x.replace(",", ""));
  } else if(line.startsWith("Operation: ")) {
    let operation = linesplitted.slice(4);
    parsed[parsed.length-1].operation = operation
  } else if(line.startsWith("Test: ")) {
    let test = linesplitted.slice(3)[0];
    parsed[parsed.length-1].test = test;
  } else if(line.startsWith("If true: throw to monkey")) {
    parsed[parsed.length-1].ifTrue = line[line.length-1];
  } else if(line.startsWith("If false: throw to monkey")) {
    parsed[parsed.length-1].ifFalse = line[line.length-1];
  }
});
// console.log(parsed);
let inspections = {}
for (var i = 0; i < 20; i++) {
  for (monkey of parsed) {
    // console.log("Monkey: " + monkey.id);
    if(!inspections[monkey.id]) inspections[monkey.id] = 0;
    for(item of monkey.startingItems) {
      inspections[monkey.id] ++;
      item = Number(item);
      let [symbol, val] = monkey.operation;
      if(val == "old") val = item;

      val = Number(val);

      let worryLevel = Math.floor((symbol == "+" ? item + val : symbol == "*" ? item * val : symbol == "-" ? item - val : symbol == "/" ? item / val : null) / 3);
      // console.log(`Worry level is calculated ${worryLevel}`);
      let test = Number(monkey.test);
      // check if worryLevel divisible by test
      if(worryLevel % test == 0) {
      // console.log(`${worryLevel}  divisible by ${test}, thrown to monkey ${monkey.ifTrue}`);

        parsed.find((x) => x.id == monkey.ifTrue).startingItems.push(worryLevel);
      } else {
      // console.log(`${worryLevel} not divisible by ${test}, thrown to monkey ${monkey.ifFalse}`);

        // throw to monkey
        parsed.find((x) => x.id == monkey.ifFalse).startingItems.push(worryLevel);
      }

      // Remove item from startingItems
      // monkey.startingItems.splice(monkey.startingItems.indexOf(item), 1);


    };
    monkey.startingItems = [];
  };
}

console.log(Object.values(inspections).sort((a, b) => b - a)[0] * Object.values(inspections).sort((a, b) => b - a)[1])
