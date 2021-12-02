function setSum(input, index, range) {
  return input.slice(index, index + range).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

export default function solution(input, range = 1) {
  let count = 0;

  for (let i = 0; i < (input.length - range); ++i) {
    if (setSum(input, i + 1, range) > setSum(input, i, range)) {
      count++;
    }
  }

  return count;
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, 3);
}
