export function solution(input) {
  const crabPositions = input.map(crab => parseInt(crab));
  const sortedCrabPositions = crabPositions.sort((a, b) => a - b);

  let fuel = 0;

  while (sortedCrabPositions.length) {
    const dist = Math.abs(sortedCrabPositions.pop() - sortedCrabPositions.shift());
    fuel += dist;
  }

  return fuel;
}

export function solution2(input) {
  const crabPositions = input.map(crab => parseInt(crab));

  let fuel = 0;

  const average = Math.floor((crabPositions.reduce((a, b) => a + b) / crabPositions.length) + .1);

  for (const pos of crabPositions) {
    const dist = Math.abs(average - pos);
    fuel += dist * ((dist + 1) / 2)
  }

  return fuel;
}


export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution2(input);
}
