import fs from 'fs';

export const example = fs.readFileSync(new URL('example.txt', import.meta.url)).toString().split('\n\n').map(group => group.split('\n').map(Number));
export const data = fs.readFileSync(new URL('sample.txt', import.meta.url)).toString().split('\n\n').map(group => group.split('\n').map(Number));
