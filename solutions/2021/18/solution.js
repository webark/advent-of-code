class Fish {
  number = 0;
  depth = 0;
  next = null;
  prev = null;

  constructor(node) {
    Object.assign(this, node);
  }

  explode() {
    const { number, depth } = this.out;

    this.prev.number += number;

    if (this.next.next) this.next.next.number += this.next.number;

    const fish = new Fish({
      number: 0,
      depth: depth - 1,
      prev: this.prev,
      next: this.next.next,
    })

    fish.prev.next = fish;
    if (fish.next) fish.next.prev = fish;

    return fish;
  }

  split() {
    const { number, depth } = this.out;

    const rightFish = new Fish({
      number: Math.floor(number / 2),
      depth: depth + 1,
      prev: this.prev,
    });

    const leftFish = new Fish({
      number: Math.ceil(number / 2),
      depth: depth + 1,
      prev: rightFish,
      next: this.next,
    });

    rightFish.prev.next = rightFish
    rightFish.next = leftFish;
    if (leftFish.next) leftFish.next.prev = leftFish

    return leftFish;
  }

  get out() {
    return {
      number: this.number,
      depth: this.depth,
      reason: this.reason,
    }
  }
}

function parseFish(line, preFish) {
  let depth = -1;
  let currentFish = preFish;

  for (const char of line) {
    switch (char) {
      case ',':
        break;
      case '[':
        depth++;
        break;
      case ']':
        depth--;
        break;
      default:
        const nextFish = new Fish({
          number: parseInt(char),
          depth,
          prev: currentFish,
          reason: 'original'
        });

        if (currentFish) {
          currentFish.next = nextFish;
        }

        currentFish = currentFish.next;
    }
  }

  return currentFish;
}


function raiseDepth(currentFish) {
  while(currentFish.next) {
    currentFish = currentFish.next;
    currentFish.depth++;
  }
}

function explodeAllFish(preFish) {
  let currentFish = preFish;

  while(currentFish.next) {
    currentFish = currentFish.next;

    if (currentFish.depth > 3) {
      currentFish = currentFish.explode();
    } else {
      continue;
    }

    return explodeAllFish(preFish);
  }

  return splitAllFish(preFish);
}

function splitAllFish(preFish) {
  let currentFish = preFish;

  while(currentFish.next) {
    currentFish = currentFish.next;

    if (currentFish.number > 9) {
      currentFish = currentFish.split();
    } else {
      continue;
    }

    return explodeAllFish(preFish);
  }

  return currentFish;
}


export function solution(input) {
  const preFish = { reason: 'start' };
  let lastFish = preFish;

  for (const [index, line] of input.entries()) {
    lastFish = parseFish(line, lastFish);
    if (index) {
      raiseDepth(preFish);
      lastFish = explodeAllFish(preFish);
    }
  }

  getMagnitude(preFish);

  return preFish.next.number;
}

function getMagnitude(preFish, currentDepth = 2) {
  let currentFish = preFish;

  while(currentFish.next) {
    currentFish = currentFish.next;
    if (currentFish.depth > currentDepth) {
      const magA = currentFish.number * 3;
      const magB = currentFish.next.number * 2;
      const newFish = new Fish({
        number: magA + magB,
        depth: currentFish.depth - 1,
        prev: currentFish.prev,
        next: currentFish.next.next,
        reason: 'summed',
      })

      newFish.prev.next = newFish;
      if (newFish.next) newFish.next.prev = newFish;

    } else {
      continue;
    }

    return getMagnitude(preFish, currentDepth)
  }

  if (currentDepth >= 0) {
    return getMagnitude(preFish, --currentDepth)
  }
}

function logFish(currentFish) {
  console.log()

  while(currentFish.next) {
    currentFish = currentFish.next;
    console.log(currentFish.out);
  }
}

export function silver(input) {
  return solution(input);
}

export function gold(input) {
  let maxScore = 0;
  const sortedInput = [...input].sort((a, b) => b.length - a.length).slice(0, 50);

  for (const lineA of sortedInput) {
    for (const lineB of sortedInput) {
      if (lineA !== lineB) {
        const newScore = solution([lineA, lineB]);
        maxScore = Math.max(maxScore, newScore);
      }
    }
  }

  return maxScore;
}
