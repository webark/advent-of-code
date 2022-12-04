import { letterToNumber } from '../02/solution.js';

export function parse(input) {
  return input.split('\n');
}

export function solution(groups) {
  return groups.reduce(function(total, group) {
    return total + findSharedItem(group) + 1;
  }, 0);
}

function findSharedItem(group) {
  const groupValues = Array(letterToNumber('Z') + 1).fill(0);

  for (const [groupIndex, sack] of group.entries()) {
    for (const item of sack) {
      const itemValue = letterToNumber(item);

      if (groupValues[itemValue] === groupIndex) {
        if (groupIndex === (group.length - 1)) {
          return itemValue;
        }
        groupValues[itemValue]++;
      }
    }
  }
}

function bySackCompartment(input) {
  return input.map(function(row) {
    const rowMiddle = Math.floor(row.length / 2);
    return [row.slice(0, rowMiddle), row.slice(rowMiddle)];
  });
}

function byElfGroup(input) {
  return input.reduce(function(groups, row, index) {
    if (index % 3 === 0) {
      groups.push([]);
    }
    groups[groups.length - 1].push(row);
    return groups;
  }, []);
}

export function silver(input) {
  const groups = bySackCompartment(input);
  return solution(groups);
}

export function gold(input) {
  const groups = byElfGroup(input);
  return solution(groups);
}
