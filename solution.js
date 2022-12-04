import colors from 'colors'
import { performance } from 'perf_hooks';

const year = process.env.YEAR
const day = process.env.DAY

const { silver, gold, parse } = await import(`./solutions/${year}/${day}/solution.js`);
const { data } = await import(`./solutions/${year}/${day}/input.js`);

function timedFunction(method) {
  const start = performance.now();
  return {
    result: method(),
    time: performance.now() - start,
  };
}


Array(20).fill(10).map(function() {
  const parsed = timedFunction(() => parse(data));
  return {
    silver: timedFunction(() => silver(parsed.result)).time,
    gold: timedFunction(() => gold(parsed.result)).time,
  };
});

const parsedInput = timedFunction(() => parse(data));
const silverSolution = timedFunction(() => silver(parsedInput.result));
const goldSolution = timedFunction(() => gold(parsedInput.result));

console.log('                                       '.bgRed)

console.log(
  `          ADVENT OF CODE ${year}          `.bold.brightRed.bgGreen
)

console.log('                                       '.bgRed)
console.log('parse time', parsedInput.time);
console.log('')

console.log(`🎄🎄 DAY ${day} SILVER 🎄🎄`.bold.green)
console.log(`${silverSolution.result} in ${silverSolution.time}`)

console.log('')

console.log(`🎄🎄 DAY ${day} GOLD 🎄🎄`.bold.green)
console.log(`${goldSolution.result} in ${goldSolution.time}`)

console.log('')

console.log('                                       '.bgRed)
console.log('                                       '.bgGreen)
console.log('                                       '.bgRed)
