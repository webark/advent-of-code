// function findThePath(logs, { to, from }) {
//   const pathMap = new Map();

//   for (const log of logs) {
//     if (log.from === from && !pathMap.has(log.to)) {
//       pathMap.set(log.to, true);
//     } else if (pathMap.has(log.from)) {
//       pathMap.set(log.to, pathMap.delete(log.from));
//     }

//     if (pathMap.has(to)) {
//       return true;
//     }
//   }

//   return false;
// }

function isSmallCave(cave) {
  return /^[a-z]{1,2}$/.test(cave);
}

function smallCavesVistedTwice(path) {
  const duplicateSmallCaves = path.reduce(function(caves, cave) {
    if (isSmallCave(cave)) caves[cave] = ++caves[cave] || 1;
    return caves;
  }, {})
  console.log(Object.values(Object.values(duplicateSmallCaves).filter(count => count > 1)))
  return Object.values(duplicateSmallCaves).filter(count => count > 0);
}

function findPath(map, current, path = [], smallCaves = new Map()) {
  path.push(current);

  if (current === 'end') return path.join(',');

  if (isSmallCave(current)) {
    smallCaves.set(current, (smallCaves.get(current) || 0) + 1);
  }

  const smallCavesVistedTwice = Array.from(smallCaves.values()).filter(cave => cave > 1);

  return map.get(current).filter(function() {
    return smallCavesVistedTwice.length === 0 || (smallCavesVistedTwice.length === 1 && smallCavesVistedTwice[0] <= 2)
  }).map(part => findPath(map, part, [...path], new Map(smallCaves))).flat()
}

function findPath2(map, current, path = []) {
  path.push(current);

  if (current === 'end') return path.join(',');

  return map.get(current).filter(function(part) {
    return !isSmallCave(part) || !path.includes(part);
  }).map(part => findPath2(map, part, [...path])).flat()
}


function setPath(map, a, b) {
  map.set(a, (map.get(a) || []).concat(b));
}


export function solution(input, caveFinder = findPath2) {
  const paths = input.map(line => line.split('-'));
  const map = new Map();

  for (const [a, b] of paths) {
    if (a !== 'start' && b !== 'end') {
      setPath(map, b, a);
    }
    if (b !== 'start' && a !== 'end') {
      setPath(map, a, b);
    }
  }

  return caveFinder(map, 'start').length;
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input, findPath);
}
