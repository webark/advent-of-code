function sortAlphabet(str) {
  return [...str].sort().join("");
}

export function solution(input) {
  const entries = input.map(entry => entry.split(' | ').map(segment => segment.split(' ')));

  let counter = 0;
  const numbers = new Set([2,3,4,7]);

  for (const [_, output] of entries) {
    counter += output.filter(number => numbers.has(number.length)).length;
  }

  return counter;
}

const LEN_TO_NUM = new Map([
  [2, 1],
  [3, 7],
  [4, 4],
  [7, 8],
]);
/*
  Rules :

  9 has all of 4
  0 has all of 7
  6 is last 6s

  3 has all of 1
  5 is all in 9
  2 is last of 5s
*/

function hasAllOf(root, test) {
  return root.split('').every(dig => test.includes(dig))
}

export function solutionb(input) {
  const entries = input.map(entry => entry.split(' | ').map(segment => segment.split(' ').map(number => sortAlphabet(number))));

  let total = 0;

  for (const [signal, output] of entries) {
    const knownBy = {
      number: new Map(),
      letter: new Map(),
    }

    function setKnown(number, string) {
      knownBy.number.set(number, string);
      knownBy.letter.set(string, number);
    }

    const numbersByCount = [...signal, ...output].reduce(function(numbers, number) {
      const count = number.length;
      const currentCount = numbers.get(count) || [];

      numbers.set(count, currentCount.concat(number));

      return numbers;
    }, new Map());

    for (const count of LEN_TO_NUM.keys()) {
      for (const number of numbersByCount.get(count)) {
        setKnown(LEN_TO_NUM.get(number.length), number);
      }
    }

    for (const number of numbersByCount.get(6)) {
      const four = knownBy.number.get(4);
      const seven = knownBy.number.get(7);
      if (hasAllOf(four, number)) {
        setKnown(9, number);
      } else if (hasAllOf(seven, number)) {
        setKnown(0, number);
      } else {
        setKnown(6, number);
      }
    }

    for (const number of numbersByCount.get(5)) {
      const one = knownBy.number.get(1);
      const nine = knownBy.number.get(9);
      if (hasAllOf(one, number)) {
        setKnown(3, number);
      } else if (hasAllOf(number, nine)) {
        setKnown(5, number);
      } else {
        setKnown(2, number);
      }
    }

    total += parseInt(output.map(number => knownBy.letter.get(number)).join(''));
  }

  return total;
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solutionb(input);
}
