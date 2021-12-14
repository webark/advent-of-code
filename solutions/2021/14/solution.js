function thing(polymer, rules, pair, totalSteps, step = 0) {
  if (step++ === totalSteps) return;

  const element = rules.get(pair);
  polymer.set(element, polymer.get(element) + 1);

  thing(polymer, rules, pair[0] + element, totalSteps, step);
  thing(polymer, rules, element + pair[1], totalSteps, step);
}

export function solution(input, steps = 10) {
  const [polymerTemplate, rulesRaw] = input;

  const rules = new Map(rulesRaw.split('\n').map(line => line.split(' -> ')));
  const polymer = new Map();

  for (const element of polymerTemplate) {
    polymer.set(element, (polymer.get(element) || 0) + 1)
  }

  [...polymerTemplate].forEach(function(char, index, charArray) {
    if (index) thing(polymer, rules, charArray[index - 1] + char, steps);
  });

  console.log(polymer)

  return Math.max(...polymer.values()) - Math.min(...polymer.values())
}

export function silver(input) {
  return solution(input, 10);
}

export function gold(input) {
  return solution(input, 40);
}
