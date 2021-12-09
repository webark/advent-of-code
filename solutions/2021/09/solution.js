function getHeight(heights, [y, x]) {
  return heights[y] ? heights[y][x] : undefined;
}

function goodPoint(heights, current, neighbor) {
  const currentHeight = getHeight(heights, current);
  const neighborHight = getHeight(heights, neighbor);
  return neighborHight === undefined || currentHeight < neighborHight;
}

function getNeighbors([y, x]) {
  return [
    [y + 1, x],
    [y - 1, x],
    [y, x - 1],
    [y, x + 1],
  ]
}

function findBasinLowPoint(heights, point, basins = []) {
  const current = getHeight(heights, point);
  if (current === undefined) return basins;

  const neighbors = getNeighbors(point);

  if (neighbors.every(neighbor => goodPoint(heights, point, neighbor))) {
    basins.push({
      risk: 1 + current,
      size: findBasin(heights, point),
    });
  }

  return findBasinLowPoint(heights, neighbors[3], basins);
}

function findBasin(heights, point, basinPoints = new Set()) {
  const current = getHeight(heights, point);

  if (current === undefined || current === 9 || basinPoints.has(point.toString())) return basinPoints.size;
  basinPoints.add(point.toString());

  getNeighbors(point).forEach(neighbor => {
    if (goodPoint(heights, point, neighbor)) {
      findBasin(heights, neighbor, basinPoints);
    }
  });

  return basinPoints.size;
}


export function solution(input) {
  const heights = input.map(line => line.split('').map(number => parseInt(number)));

  const basins = heights.reduce(function(rowBasins, _, y, map) {
    return rowBasins.concat(findBasinLowPoint(map, [y, 0]));
  }, []);

  return basins.sort((a, b) => a.size - b.size);
}

export function silver(input) {
  return solution(input).map(basin => basin.risk).reduce((a, b) => a + b);
}

export function gold(input) {
  return solution(input).map(basin => basin.size).slice(-3).reduce((a, b) => a * b);
}
