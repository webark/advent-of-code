import { test } from 'uvu';
import { strict as assert } from 'assert';

import { silver, gold } from './solution.js'
import { example } from './input.js'

test('silver example', () => {
  assert.equal(silver(example), 150);
})

test('gold example', () => {
  assert.equal(gold(example), 900);
})

test.run();