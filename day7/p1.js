const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let tree = {files: []};
let cwd = [];
input.forEach((line,i) => {
  if(line.startsWith("$ cd")) {
    let a = line.split(" ")[2]
    if(a == "..") {
      cwd = cwd.slice(0, cwd.length-1)
    } else if (a == "/") {
      cwd = []
    } else {
      cwd.push(a)
    }

    // access nested tree based on cwd
    let current = tree;
    cwd.forEach((item) => {
      if(!current[item]) current[item] = {files: []}
      current = current[item]
    })
  } else if(line.startsWith("$ ls")) {
    // get next x lines that dont start with $
    let nextLines = [];
    for(let j = i+1; j < input.length; j++) {
      if(input[j].startsWith("$")) break;
      nextLines.push(input[j])
    }
    nextLines.forEach((item) => {
      if(item.startsWith("dir")) {
        // access nested tree based on cwd
        let current = tree;
        cwd.forEach((item) => {
          if(!current[item]) current[item] = {files: []}
          current = current[item]
        });
        current[item.split(" ")[1]] = {files: []}
      } else {
        // access nested tree based on cwd
        const [size, name] = item.split(" ")
        let current = tree;
        cwd.forEach((item) => {
          if(!current[item]) current[item] = {files: []}
          current = current[item]
        });
        current.files.push({name, size})
      }
    });
  }
})

// Find all directories size
function findSize(tree) {
  let size = 0;
  tree.files.forEach((item) => {
    size += parseInt(item.size)
  })
  Object.values(tree).forEach((item) => {
    if(item.files) {
      size += findSize(item)
    }
  })
  return size;
}
let sum = 0;
function find(tree) {
Object.keys(tree).forEach((item) => {
  if(item == "files") return;
  if(findSize(tree[item]) <= 100000) sum += findSize(tree[item]);
  find(tree[item])
});
}
find(tree)

console.log(sum)