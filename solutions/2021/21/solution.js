export function solution(input) {
  const boardSize = 10;
  const players = input.map(function(line) {
    return {
      space: parseInt(line.slice(-1)),
      score: 0,
    };
  });

  const winningScore = 1000;
  const diceSides = 100;
  let turn = 0;

  while (players[0].score < winningScore && players[0].score < winningScore) {
    const player = turn % 2;
    const roll = (((((turn * 3) + 2) * 3) - 1) % diceSides) + 1;
    players[player].space = ((players[player].space + roll - 1) % boardSize) + 1;
    players[player].score += players[player].space;
    turn++;
  }

  return Math.min(players[0].score, players[1].score) * (turn * 3);
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input);
}
