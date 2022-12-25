const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")

convert("1=-0-2"); // 1747

function convert(base5, base10) {
    base5 = base5.split("").map((x) => x == "=" ? -2 : x == "-" ? -1 : parseInt(x)).reverse();

    let sm = 0;
    base5.forEach((e, i) => {
        let place = Math.pow(5, i);
        sm+= e * place;
    })
return sm;
}

// opposite

function realToSnafu(n) {
    let o = "";
    while (true) {
      let base_d = n % 5;
      if (base_d === 0) {
        o = "0" + o;
        n = Math.floor(n / 5);
      } else if (base_d === 1) {
        o = "1" + o;
        n -= 1;
        n = Math.floor(n / 5);
      } else if (base_d === 2) {
        o = "2" + o;
        n -= 2;
        n = Math.floor(n / 5);
      } else if (base_d === 3) {
        o = "=" + o;
        n += 2;
        n = Math.floor(n / 5);
      } else if (base_d === 4) {
        o = "-" + o;
        n += 1;
        n = Math.floor(n / 5);
      }
      if (n === 0) {
        return o;
      }
    }
  }


let sum = 0;
input.forEach((e) => {
  sum+=  convert(e);
});
console.log(sum)

console.log(realToSnafu(sum));