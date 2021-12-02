import colors from 'colors'

const year = process.env.YEAR
const day = process.env.DAY

const { silver, gold } = await import(`./solutions/${year}/${day}/solution.js`);
const { data } = await import(`./solutions/${year}/${day}/input.js`);

const silverSolution = silver(data);
const goldSolution = gold(data);

console.log('                                       '.bgRed)

console.log(
  `          ADVENT OF CODE ${year}          `.bold.brightRed.bgGreen
)

console.log('                                       '.bgRed)

console.log('')

console.log(`🎄🎄 DAY ${day} SILVER 🎄🎄`.bold.green)
console.log(`${silverSolution}\n`)

console.log(`🎄🎄 DAY ${day} GOLD 🎄🎄`.bold.green)
console.log(goldSolution)

console.log('')

console.log('                                       '.bgRed)
console.log('                                       '.bgGreen)
console.log('                                       '.bgRed)
