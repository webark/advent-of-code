// export function solution(input) {
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
function processInput(input) {
  const [numbers, ...boards] = input;

  return {
    numbers: numbers.split(','),
    boards: boards.map(board => board.split('\n').map(line => line.match(/\d+/g))),
  };
}


function getRowColumn(board, number) {
  for (const [rowIndex, row] of board.entries()) {
    for (const [columnIndex, currentNumber] of row.entries()) {
      if (number === currentNumber) {
        return [rowIndex, columnIndex];
      }
    }
  }

  return [];
}

function getFoundKeys(board, number, boardNumber) {
  const [rowIndex, columnIndex] = getRowColumn(board, number);

  if (rowIndex !== undefined) {
    const boardKey = `b${boardNumber}`;
    return [`${boardKey}.r${rowIndex}`, `${boardKey}.c${columnIndex}`]
  }

  return [];
}

function getBoardTotal(board, number, runningTotoal = 0) {
  return (board.flat().reduce((a, b) => parseInt(a) + parseInt(b)) - runningTotoal - number) * number
}


export function solution(input) {
  const { numbers, boards } = processInput(input);
  const found = new Map();
  const boardTotals = [];

  for (const number of numbers) {
    for (const [boardNumber, board] of boards.entries()) {
      const [rowKey, columnKey] = getFoundKeys(board, number, boardNumber);

      if (rowKey === undefined) continue;

      const foundRow = (found.get(rowKey) || []).concat(number);
      const foundColumn = (found.get(columnKey) || []).concat(number);
      found.set(rowKey, foundRow);
      found.set(columnKey, foundColumn);

      if (foundRow.length === 5 || foundColumn.length === 5) {
        return getBoardTotal(board, number, boardTotals[boardNumber]);;
      } else {
        boardTotals[boardNumber] = parseInt(number) + (boardTotals[boardNumber] || 0)
      }
    }
  }

  return 0;
}

export function solution2(input) {
  const { numbers, boards } = processInput(input);
  const found = new Map();
  const matchedBoards = [];
  const boardTotals = [];

  for (const number of numbers) {
    for (const [boardNumber, board] of boards.entries()) {
      if (matchedBoards.includes(boardNumber)) continue;
      const [rowKey, columnKey] = getFoundKeys(board, number, boardNumber);
      if (rowKey === undefined) continue;
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
