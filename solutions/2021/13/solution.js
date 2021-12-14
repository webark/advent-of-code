export function solution(input) {
  const [pointsRaw, foldsRaw] = input;

  const folds = {
    y: foldsRaw.filter(fold => fold.startsWith('fold along y=')).map(fold => parseInt(fold.replace('fold along y=', ''))),
    x: foldsRaw.filter(fold => fold.startsWith('fold along x=')).map(fold => parseInt(fold.replace('fold along x=', ''))),
  };

  const combinedFolds = [];

  for (const [index, yFold] of folds.y.entries()) {
    combinedFolds.push([yFold, folds.x[index]]);
  }

  const points = new Set(pointsRaw);

  for (const [yFold, xFold] of combinedFolds) {
    points.forEach(function(point) {
      const [x, y] = point.match(/\d+/g);

      if (y > yFold || x > xFold) {
        points.delete(point);
        points.add(`${x > xFold ? xFold * 2 - x : x},${y > yFold ? yFold * 2 - y : y}`);
      }
    });
  }

  return points;
}

function printCode(points) {
  const printPoints = []

  points.forEach(function(point) {
    const [x, y] = point.split(',').map(p => parseInt(p));
    printPoints[y] = printPoints[y] || [];
    printPoints[y][x] = '🌟';
  })

  for (let x = 0; x < printPoints.length; x++) {
    for (let y = 0; y < printPoints[x].length; y++) {
      printPoints[x][y] = printPoints[x][y] || '🌑';
    }
  }

  console.log('\n')
  console.log(printPoints.map(line => line.join('')).join('\n'));
  console.log('\n')
}

export function silver(input) {
  return solution(input).size;
}

export function gold(input) {
  return printCode(solution(input));
}


