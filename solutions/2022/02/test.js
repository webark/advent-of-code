import { test } from 'uvu';
import { strict as assert } from 'assert';

import { silver, gold, parse} from './solution.js'
import { example } from './input.js'

test('silver example', () => {
  assert.equal(silver(parse(example)), 15);
})

test('gold example', () => {
  assert.equal(gold(parse(example)), 12);
})

test.run();