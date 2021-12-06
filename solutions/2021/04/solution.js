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


export function solution(input, everybodyWins) {
  const { numbers, boards } = processInput(input);
  const found = new Map();
  const boardTotals = [];
  const winningBoards = new Set();
  const boardToWin = everybodyWins ? boards.length : 1

  for (const number of numbers) {
    for (const [boardNumber, board] of boards.entries()) {
      if (winningBoards.has(boardNumber)) continue;

      const [rowKey, columnKey] = getFoundKeys(board, number, boardNumber);

      if (rowKey === undefined) continue;

      const foundRow = (found.get(rowKey) || []).concat(number);
      const foundColumn = (found.get(columnKey) || []).concat(number);
      found.set(rowKey, foundRow);
      found.set(columnKey, foundColumn);

      if (foundRow.length === 5 || foundColumn.length === 5) {
        winningBoards.add(boardNumber);
        if (winningBoards.size === boardToWin) {
          return getBoardTotal(board, number, boardTotals[boardNumber]);
        }
      } else {
        boardTotals[boardNumber] = parseInt(number) + (boardTotals[boardNumber] || 0)
      }
    }
  }
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, true);
}
