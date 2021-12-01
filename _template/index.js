import { data } from './input'
import solution from './solution'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data);

export const part1 = (input = parsedData) => {
  return solution(input);
}

export const part2 = (input = parsedData) => {
  return solution(input);
}

export default {
  part1,
  part2,
}
