import { test } from 'uvu';
import { strict as assert } from 'assert';

import { silver, gold } from './solution.js'
import { example } from './input.js'

test('silver example', () => {
  assert.equal(silver(example), 1588);
})

test('gold example', () => {
  assert.equal(gold(example), 2188189693529);
})

test.run();