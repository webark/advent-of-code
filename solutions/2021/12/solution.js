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


let allPathsCount = 0;

function findPath(map, current, path = [], smallCaves = new Map()) {
  path.push(current);

  if (/[a-z]/.test(current)) {
    smallCaves.set(current, (smallCaves.get(current) || 0) + 1);
  }

  if (current === 'end') { return allPathsCount++; }

  for (const part of map.get(current)) {
    const smallCavesVistedTwice = Array.from(smallCaves.values()).filter(cave => cave > 1)
    if (smallCavesVistedTwice.length === 0 || (smallCavesVistedTwice.length === 1 && smallCavesVistedTwice[0] <= 2)) {
    // if (!smallCaves.has(part)) {
      findPath(map, part, [...path], new Map(smallCaves));
    }
  }
}

function setPath(map, a, b) {
  const dest = map.get(a) || [];
  dest.push(b)
  map.set(a, dest);
}


export function solution(input) {
  allPathsCount = 0;
  const paths = input.map(line => line.split('-'));
  const map = new Map();

  for (const [a, b] of paths) {
    if (b === 'start' || a === 'end') {
      setPath(map, b, a);
    } else {
      setPath(map, a, b);
      if (a !== 'start' && b !== 'end') {
        setPath(map, b, a);
      }
    }
  }

  const allPaths = findPath(map, 'start');

  return allPathsCount;
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution(input);
}
