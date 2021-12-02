import { test } from 'uvu';
import { strict as assert } from 'assert';

import { silver, gold } from './solution.js'
import { example } from './input.js'

test('part 1 example', () => {
  assert.equal(silver(example), 7);
})

test('part 2 example', () => {
  assert.equal(gold(example), 5);
})

test.run();