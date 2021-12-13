function getNeighbors([y, x]) {
  return [
    [y + 1, x],
    [y + 1, x + 1],
    [y, x + 1],
    [y - 1, x + 1],
    [y - 1, x],
    [y - 1, x - 1],
    [y, x - 1],
    [y + 1, x - 1],
  ]
}

function explodeOctopi(octopuses, octopi, flashedOctopi) {
  for (const [y, x] of getNeighbors(octopi)) {
    if (octopuses[y] && octopuses[y][x] !== 'undefined') {
      chargeOctopi(octopuses, [y, x], flashedOctopi);
    }
  }
}

function chargeOctopi(octopuses, octopi, flashedOctopi) {
  const [y, x] = octopi;
  const point = `${y},${x}`;

  if (!flashedOctopi.has(point)) {
    octopuses[y][x] = ++octopuses[y][x] % 10;
    if (octopuses[y][x] === 0) {
      explodeOctopi(octopuses, octopi, flashedOctopi.add(point));
    }
  }
}


export function solution(input, steps) {
  const octopuses = input.map(line => line.split('').map(number => parseInt(number)));

  let count = 0;
  let step = 0;

  while (step++ < steps) {
    const flashedOctopi = new Set();

    for (const [y, line] of octopuses.entries()) {
      for (const [x] of line.entries()) {
        chargeOctopi(octopuses, [y, x], flashedOctopi);
      }
    }

    const newFlashes = flashedOctopi.size;
    if (newFlashes === 100) return step;
    count += newFlashes;
  }

  return count;
}

export function silver(input) {
  return solution(input, 100);
}

export function gold(input) {
  return solution(input, Infinity);
}
