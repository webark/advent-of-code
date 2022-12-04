export function parse(input) {
  return input.split('\n\n').map(group => group.split('\n').map(Number));
}

export function solution(input, amount) {
  return sum(numSort(input.map(sum)).slice(-amount));
}

export function silver(input) {
  return solution(input, 1);
}

export function gold(input) {
  return solution(input, 3);
}

function sum(array) {
  return array.reduce((sum, value) => sum + value);
}

function numSort(array) {
  return array.sort((a,b) => a - b);
}
