   let inp = require("fs").readFileSync('input.txt').toString().split("\n");
inp = inp.map(x => x.split(",").map(y => parseInt(y)));
console.log(inp);

   function countExposedSides(cubes) {
    // Create a set to store the positions of all the cubes
    const cubePositions = new Set();
    // Add the positions of all the cubes to the set
    for (const cube of cubes) {
      cubePositions.add(cube.join(","));
    }

    // Initialize the count of exposed sides to 0
    let exposedSides = 0;

    // Loop through all the cubes
    for (const cube of cubes) {
      // Check the six directions around the cube (left, right, up, down, front, back)
      // If there is no cube in that direction, add 1 to the count of exposed sides
      if (!cubePositions.has((cube[0] - 1) + "," + cube[1] + "," + cube[2])) exposedSides++;
      if (!cubePositions.has((cube[0] + 1) + "," + cube[1] + "," + cube[2])) exposedSides++;
      if (!cubePositions.has(cube[0] + "," + (cube[1] - 1) + "," + cube[2])) exposedSides++;
      if (!cubePositions.has(cube[0] + "," + (cube[1] + 1) + "," + cube[2])) exposedSides++;
      if (!cubePositions.has(cube[0] + "," + cube[1] + "," + (cube[2] - 1))) exposedSides++;
      if (!cubePositions.has(cube[0] + "," + cube[1] + "," + (cube[2] + 1))) exposedSides++;
    }

    // Return the total count of exposed sides
    return exposedSides;
  }

  // Example usage:
  const cubes = inp;
  console.log(countExposedSides(cubes)); // Outputs: 64
