import fs from 'fs';

export const example = fs.readFileSync(new URL('example.txt', import.meta.url)).toString().split('\n\n');
export const data = fs.readFileSync(new URL('sample.txt', import.meta.url)).toString().split('\n\n');
