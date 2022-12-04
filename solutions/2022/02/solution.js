export function letterToNumber(char) {
  if (char.length !== 1 || /[^a-zA-Z]/.test(char)) {
    throw new Error(`only accepts a single letter, received ${char}`);
  }

  const code = char.charCodeAt(0);
  if (code <= 90) {
    return code - 65 + 26;
  } else {
    return code - 97;
  }
}

function cumulativeScore(score, mine, result) {
  return score + ((result + 1) * 3) + (mine + 1);
}

function handleGame(input, runner) {
  return input.reduce(function(score, round) {
    const { result, mine } = runner(round);
    return cumulativeScore(score, mine, result);
  }, 0);
}

function rpsNormalize(value, normalizer = 3) {
  return (value + normalizer) % 3;
}

export function solution(input) {
  return handleGame(input, function([rawOpponent, rawMine]) {
    const opponent = letterToNumber(rawOpponent) - letterToNumber('A'); // r 0, p 1, s 2
    const mine = letterToNumber(rawMine) - letterToNumber('X'); // r 0, p 1, s 2

    // the +1 -1 is to take into account the idiosyncrasies of the 0 = 2 needing to be -1, and 2 - 0 needing to be 1
    const result = rpsNormalize(mine - opponent + 1) - 1; // r 0, p 1, s 2

    return { result, mine, opponent };
  }, 0);
}

export function solutionB(input) {
  return handleGame(input, function([rawOpponent, rawResult]) {
    const opponent = letterToNumber(rawOpponent) - letterToNumber('A'); // r 0, p 1, s 2
    const result = letterToNumber(rawResult) - letterToNumber('X') - 1; // l -1, d 0, w 1

    const mine = rpsNormalize(result + opponent); // r 0, p 1, s 2

    return { result, mine, opponent };
  });
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solutionB(input);
}

export function parse(rawInput) {
  return rawInput.split('\n').map(row => row.split(' '));
}
