function setSum(input, index, range) {
  return input.slice(index, index + range).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

export default function compageRange(input, range = 1) {
  let count = 0;

  for (let i = 1; i < (input.length - range + 1); i++) {
    if (setSum(input, i, range) > setSum(input, i - 1, range)) {
      count++;
    }
  }

  return count;
}
