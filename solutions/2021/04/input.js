import fs from 'fs';

// export const example = processInput(fs.readFileSync(new URL('example.txt', import.meta.url)).toString());
// export const data = processInput(fs.readFileSync(new URL('sample.txt', import.meta.url)).toString());

// function processInput(input) {
//   const [numbers, ...boards] = input.split('\n\n');

//   return {
//     numbers: numbers.split(','),
//     boards: boards.map(board => board.split('\n').map(line => line.match(/\d+/g))),
//   };
// }

export const example = fs.readFileSync(new URL('example.txt', import.meta.url)).toString().split('\n\n');
export const data = fs.readFileSync(new URL('sample.txt', import.meta.url)).toString().split('\n\n');
