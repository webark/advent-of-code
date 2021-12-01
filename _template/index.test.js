const { inputParser, part1, part2 } = require('./index.js')
const { example } = require('./input.js')

test('part 1 example', () => {
  expect(part1(inputParser(example))).toBe(0)
})

test('part 2 example', () => {
  expect(part2(inputParser(example))).toBe(0)
})
