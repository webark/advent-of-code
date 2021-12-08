// export function solution(input, days = 80) {
//   const fishes = input.map(fish => parseInt(fish));
//   let totalFishes = 0;

//   for (const fishStartingAge of fishes) {
//     const fishAge = 7 - fishStartingAge;
//     const partialFish = 2 ** Math.floor((days + fishAge - 1) / 7);
//     totalFishes += partialFish
//   }

//   return totalFishes;
// }

export function solution(input, days = 80) {
  const queue = Array(9).fill(0);
  for (const fish of input) {
    queue[fish]++;
  }

  let day = 1;
  do {
    const currentFishes = queue.shift();
    queue.push(currentFishes);
    queue[6] += currentFishes;
  } while (day++ < days)

  return queue.reduce((a, b) => a + b);
}

export function silver(input) {
  return solution(input, 80);
}

export function gold(input) {
  return solution(input, 256);
}


/*
Initial state: 3,4,3,1,2
After  1 day:  2,3,2,0,1
After  2 days: 1,2,1,6,0, 8
After  3 days: 0,1,0,5,6, 7,8
After  4 days: 6,0,6,4,5, 6,7,8,8
After  5 days: 5,6,5,3,4, 5,6,7,7,8
After  6 days: 4,5,4,2,3, 4,5,6,6,7
After  7 days: 3,4,3,1,2, 3,4,5,5,6
After  8 days: 2,3,2,0,1, 2,3,4,4,5
After  9 days: 1,2,1,6,0, 1,2,3,3,4,8
After 10 days: 0,1,0,5,6, 0,1,2,2,3,7,8
After 11 days: 6,0,6,4,5,6, 0,1,1,2,6,7,8,8,8
After 12 days: 5,6,5,3,4,5,6, 0,0,1,5,6,7,7,7,8,8
After 13 days: 4,5,4,2,3,4,5,6,6, 0,4,5,6,6,6,7,7,8,8
After 14 days: 3,4,3,1,2,3,4,5,5,6, 3,4,5,5,5,6,6,7,7,8
After 15 days: 2,3,2,0,1,2,3,4,4,5, 2,3,4,4,4,5,5,6,6,7
After 16 days: 1,2,1,6,0,1,2,3,3,4, 1,2,3,3,3,4,4,5,5,6,8
After 17 days: 0,1,0,5,6,0,1,2,2,3, 0,1,2,2,2,3,3,4,4,5,7,8
After 18 days: 6,0,6,4,5,6,0,1,1,2,6, 0,1,1,1,2,2,3,3,4,6,7,8,8,8,8


8
7,8
6,7,8,8
5,6,7,7,8
4,5,6,6,7
3,4,5,5,6
2,3,4,4,5
1,2,3,3,4,8
0,1,2,2,3,7,8
  0,1,1,2,6,7,8,8,8
    0,0,1,5,6,7,7,7,8,8
        0,4,5,6,6,6,7,7,8,8
          3,4,5,5,5,6,6,7,7,8
          2,3,4,4,4,5,5,6,6,7
          1,2,3,3,3,4,4,5,5,6,8
          0,1,2,2,2,3,3,4,4,5,7,8
            0,1,1,1,2,2,3,3,4,6,7,8,8,8,8

0: 3,4,3,1,2
1: 2,3,2,0,1
2: 1,2,1,6,0,6
3: 0,1,0,5,6,5,6
4: 6,0,6,4,5,4,5,6,6
5: 5,6,5,3,4,3,4,5,5,6
6: 4,5,4,2,3,2,3,4,4,5
7: 3,4,3,1,2,1,2,3,3,4
8: 2,3,2,0,1,0,1,2,2,3
9: 1,2,1,6,0,6,0,1,1,2,6,6



0:  1
1:  0
2:  6,6
3:  5,5
4:  4,4
5:  3,3
6:  2,2
7:  1,1
8:  0,0
9:  6,6,6,6
10: 5,5,5,5
11: 4,4,4,4

0:  1
1:  0
2:  6,8
3:  5,7
4:  4,6
5:  3,5
6:  2,4
7:  1,3
8:  0,2
9:  6,1,8
10: 5,0,7
11: 4,6,6,8

*/
