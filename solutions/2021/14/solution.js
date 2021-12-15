function incrementMapKey(map, key, amount = 1) {
  map.set(key, map.get(key) + amount);
}

function step(rules, elementCount, elements) {
  const oldElementCounts = new Map(elementCount);

  for (const pair of elementCount.keys()) {
    const element = rules.get(pair);
    const count = oldElementCounts.get(pair);

    incrementMapKey(elements, element, count);
    incrementMapKey(elementCount, pair, -count);

    [pair[0] + element, element + pair[1]].forEach(function(newPair) {
      incrementMapKey(elementCount, newPair, count);
    })
  };
}

function processInput([polymerTemplate, rulesRaw]) {
  const rules = new Map();
  const elementCount = new Map();
  const elements = new Map();

  rulesRaw.split('\n').forEach(function(line) {
    const [pair, element] = line.split(' -> ');

    rules.set(pair, element)
    elements.set(element, 0);
    elementCount.set(pair, 0);
  });

  [...polymerTemplate].forEach(function(element, index) {
    incrementMapKey(elements, element);
    if (index) incrementMapKey(elementCount, polymerTemplate[index - 1] + element);
  });

  return { rules, elementCount, elements };
}


export function solution(input, steps) {
  const { rules, elementCount, elements } = processInput(input);

  while (steps-- > 0) {
    step(rules, elementCount, elements);
  }

  return Math.max(...elements.values()) - Math.min(...elements.values())
}

export function silver(input) {
  return solution(input, 10);
}

export function gold(input) {
  return solution(input, 40);
}
