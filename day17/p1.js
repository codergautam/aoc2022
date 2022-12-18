   let inp = require("fs").readFileSync('input.txt').toString();

   let chamber = [[],[],[],[],[],[],[]]; //x is the first dimension, y is the second



   let rockTypes = [
     [[0,0],[1,0],[2,0],[3,0]],
     [[1,0],[1,1],[0,1],[2,1],[1,2]],
     [[2,2],[2,1],[2,0],[1,0],[0,0]],
     [[0,0],[0,1],[0,2],[0,3]],
     [[0,0],[0,1],[1,0],[1,1]]]

   let jetIndex = 0;
   let maxHeight = -1;
   let times = 2022;


   function dropRock(rock) {
    while (true) {
      // console.log(rock[0]);

      // Get the next force from the input array
      let force = inp[(jetIndex++) % inp.length];

      // Calculate the new position of the rock based on the force
      let newRock;
      if (force === '<') {
        newRock = rock.map(([x, y]) => [x - 1, y]);
      } else {
        newRock = rock.map(([x, y]) => [x + 1, y]);
      }

      // Check if the new position of the rock is valid
      let canReplace = true;
      for (let coord of newRock) {
        if (coord[0] < 0 || coord[0] >= 7 || chamber[coord[0]][coord[1]]) {
          canReplace = false;
        }
      }

      // If the new position is valid, update the rock's position
      if (canReplace) {
        rock = newRock;
      }

      // Calculate the new position of the rock after it has fallen one step
      newRock = rock.map(([x, y]) => [x, y - 1]);

      // Check if the rock has reached the bottom
      let hasReachedBottom = false;
      for (let coord of newRock) {
        if (coord[1] < 0 || chamber[coord[0]][coord[1]]) {
          hasReachedBottom = true;
        }
      }

      // If the rock has reached the bottom, add it to the chamber and break out of the loop
      if (hasReachedBottom) {
        for (let coord of rock) {
          chamber[coord[0]][coord[1]] = 1;
          if (coord[1] > maxHeight) {
            maxHeight = coord[1];
          }
        }
        break;
      } else {
        // If the rock has not reached the bottom, update its position and continue the loop
        rock = newRock;
      }
    }
  }

   for (let i=0;i<times;i++) {

    // create new rock
     let rock = rockTypes[i%5].map(x=>[x[0]+2,x[1]+maxHeight+4]);

     dropRock(rock);

     if(i == times-1) {
     // why +1?? i have no clue
     console.log(maxHeight+1)
     }
   }