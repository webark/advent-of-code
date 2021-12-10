// export function solution(input) {
//   const illegalChunks = /\)|\]|\}|\>/;
//   const legalChunks = /\(\)|\[\]|\{\}|\<\>/g;
//   const totals = {
//     errors: [],
//     autocomplete: [],
//   };

//   for (let line of input) {
//     while (line !== line.replace(legalChunks, '')) {
//       line = line.replace(legalChunks, '');
//     }

//     if (line.match(illegalChunks)) {
//       totals.errors.push(line.match(illegalChunks)[0]);
//     } else {
//       totals.autocomplete.push(line);
//     }
//   }

//   return totals;
// }

function processChunks(line) {
  const legal = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  }
  const chunks = [];

  for (const char of line) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        chunks.push(char);
        break;
      default:
        if (legal[char] !== chunks.pop()) {
          return char;
        }
    }
  }

  return chunks;
}

export function solution(input) {
  const totals = {
    errors: [],
    autocomplete: [],
  };

  for (const line of input) {
    const processed = processChunks(line);

    if (typeof processed === 'string') {
      totals.errors.push(processed);
    } else {
      totals.autocomplete.push(processed);
    }
  }

  return totals;
}


export function silver(input) {
  const score = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  const { errors } = solution(input);

  return errors.map(err => score[err]).reduce((a, b) => a + b);
}

export function gold(input) {
  const score = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };
  const { autocomplete } = solution(input);

  const scores = autocomplete
    .map(line =>
      line.reduceRight((total, char) => (total * 5 + score[char]), 0)
    ).sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
}
