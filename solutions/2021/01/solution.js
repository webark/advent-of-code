export function solution(input, range = 1) {
  return input.reduce(function(count, depth, index, array) {
    const isDepthIncreasing = parseInt(depth) < parseInt(array[index + range]);
    return count + Number(isDepthIncreasing);
  }, 0);
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, 3);
}
