import fs from 'fs';

export const example = fs.readFileSync(`solutions/${process.env.YEAR}/${process.env.DAY}/example.txt`, 'utf8').toString();
export const data = fs.readFileSync(`solutions/${process.env.YEAR}/${process.env.DAY}/sample.txt`, 'utf8').toString();
