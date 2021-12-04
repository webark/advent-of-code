// export default function solution(input) {
//   const [numbers, ...boards] = input;

//   for (const number of numbers.split(',')) {
//     for (const boardNumber in boards) {
//       boards[boardNumber] = boards[boardNumber].replace(RegExp(number.padStart(2, ' ') + '\\b'), 'xx');
//       if (/( ?xx ?){5}/.test(boards[boardNumber])) {
//         return number * boards[boardNumber].match(/\d+/g).reduce((a, b) => parseInt(a) + parseInt(b));
//       }
//     }
//   }

//   return 0;
// }

function getRowColumn(board, number) {
  const match = board.match(RegExp(`([^]*)${number.padStart(2, ' ')}\\b`));
  if (match) {
    const currentPlace = match[1].length / 3;
    return [Math.floor(currentPlace / 5), currentPlace % 5];
  }

  return [];
}

function getBoardTotal(board, number, runningTotoal = 0) {
  return (board.match(/\d+/g).reduce((a, b) => parseInt(a) + parseInt(b)) - runningTotoal - number) * number
}

export default function solution(input) {
  const [numbers, ...boards] = input;
  const found = new Map();
  const boardTotals = [];

  for (const number of numbers.split(',')) {
    for (const [boardNumber, board] of boards.entries()) {
      const [row, column] = getRowColumn(board, number);
      if (row === undefined) continue;
      const boardKey = `b${boardNumber}`;
      const rowKey = `${boardKey}.r${row}`;
      const columnKey = `${boardKey}.c${column}`;
      const foundRow = found.get(rowKey) || [];
      const foundColumn = found.get(columnKey) || [];

      if (foundRow.length === 4 || foundColumn.length === 4) {
        return getBoardTotal(board, number, boardTotals[boardNumber]);;
      } else {
        boardTotals[boardNumber] = parseInt(number) + (boardTotals[boardNumber] || 0)
        found.set(rowKey, foundRow.concat(number));
        found.set(columnKey, foundColumn.concat(number));
      }
    }
  }

  return 0;
}

export function solution2(input) {
  const [numbers, ...boards] = input;
  const found = new Map();
  const matchedBoards = [];
  const boardTotals = [];

  for (const number of numbers.split(',')) {
    for (const [boardNumber, board] of boards.entries()) {
      if (matchedBoards.includes(boardNumber)) continue;
      const [row, column] = getRowColumn(board, number);
      if (row === undefined) continue;
      const boardKey = `b${boardNumber}`;
      const rowKey = `${boardKey}.r${row}`;
      const columnKey = `${boardKey}.c${column}`;
      const foundRow = found.get(rowKey) || [];
      const foundColumn = found.get(columnKey) || [];

      if (foundRow.length === 4 || foundColumn.length === 4) {
        matchedBoards.push(boardNumber);
        if (matchedBoards.length === boards.length) {
          return getBoardTotal(board, number, boardTotals[boardNumber]);;
        }
      } else {
        boardTotals[boardNumber] = parseInt(number) + (boardTotals[boardNumber] || 0)
        found.set(rowKey, foundRow.concat(number));
        found.set(columnKey, foundColumn.concat(number));
      }
    }
  }

  return 0;
}


export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution2(input);
}
