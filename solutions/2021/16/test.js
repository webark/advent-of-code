import { test } from 'uvu';
import { strict as assert } from 'assert';

import { silver, gold } from './solution.js'
import { example } from './input.js'

test('silver example', () => {
  assert.equal(silver(example), '6,16,12,23,31,14,8,15,11,13,19,16,20');
})

test('gold example', () => {
  assert.equal(gold(example), '2021,15,46,46,54,3,54,7,9,1,0,0,1');
})

test.run();