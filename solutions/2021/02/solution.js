export function solution(input, aimed = false) {
  const { forward, aimedDepth, depth } = input.reduce(function(totals, movement) {
    const [direction, amount] = movement.split(' ');

    switch (direction) {
      case 'forward':
        totals.forward += parseInt(amount);
        totals.aimedDepth += parseInt(amount) * totals.depth;
        break;
      case 'up':
        totals.depth -= parseInt(amount);
        break;
      case 'down':
        totals.depth += parseInt(amount);
        break;
    }

    return totals;
  }, { forward: 0, aimedDepth: 0, depth: 0 });

  return forward * (aimed ? aimedDepth : depth);
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, true);
}
