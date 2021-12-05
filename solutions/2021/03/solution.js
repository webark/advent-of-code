export function solution(input) {
  const threshold = Math.ceil(input.length / 2);
  const tallies = [];

  for (const row of input) {
    for (let i = 0; i < row.length; i++) {
      tallies[i] = (tallies[i] || 0) + parseInt(row[i]);
    }
  }

  const finalHigh = tallies.map(place => Number(place > threshold)).join('');
  const finalLow = tallies.map(place => Number(place < threshold)).join('');

  return parseInt(finalHigh.toString(), 2) * parseInt(finalLow.toString(), 2);
}


function findNumber(inputs, most = false, currentIndex = 0) {
  if (inputs.length === 1) return inputs[0];

  const tallies = [[], []];

  for (const row of inputs) {
    tallies[Number(row[currentIndex])].push(row);
  }

  return findNumber(tallies[Number(tallies[0].length > tallies[1].length !== most)], most, ++currentIndex)
}

function solution2(input) {
  const o2 = findNumber(input, true);
  const co2 = findNumber(input);

  return parseInt(o2.toString(), 2) * parseInt(co2.toString(), 2);
}


export function silver(input) {
  return solution(input);
}

export function gold(input) {
  return solution2(input);
}
