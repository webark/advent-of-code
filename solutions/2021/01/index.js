import { data } from './input'
import solution from './solution'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data);

export const part1 = (input = parsedData) => {
  return solution(input, 1);
}

export const part2 = (input = parsedData) => {
  return solution(input, 3);
}

export default {
  part1,
  part2,
}
