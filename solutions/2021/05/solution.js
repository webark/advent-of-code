export function solution(input, includeDiagonals) {
  const pointPairs = input.map(line => line.match(/\d+/g).map(p => parseInt(p)))
  const uninquePoints = new Set();
  const matchedPoints = new Set();

  function matchPoints([x, y]) {
    const point = `${x},${y}`;

    if (uninquePoints.has(point)) {
      matchedPoints.add(point);
    } else {
      uninquePoints.add(point);
    }
  }

  for (const pointPair of pointPairs) {
    const [x1, y1, x2, y2] = pointPair;

    if (!includeDiagonals && x1 !== x2 && y1 !== y2) continue;

    let [x, y] = [x1, y1];

    if (x <= x2 && y <= y2) {
      while (x <= x2 && y <= y2) {
        matchPoints([x, y]);
        if (x1 !== x2) x++;
        if (y1 !== y2) y++;
      }

    } else if (x >= x2 && y <= y2) {
      while (x >= x2 && y <= y2) {
        matchPoints([x, y]);
        if (x1 !== x2) x--;
        if (y1 !== y2) y++;
      }

    } else if (x <= x2 && y >= y2) {
      while (x <= x2 && y >= y2) {
        matchPoints([x, y]);
        if (x1 !== x2) x++;
        if (y1 !== y2) y--;
      }

    } else if (x >= x2 && y >= y2) {
      while (x >= x2 && y >= y2) {
        matchPoints([x, y]);
        if (x1 !== x2) x--;
        if (y1 !== y2) y--;
      }
    }
  }

  return matchedPoints.size;
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, true);
}
