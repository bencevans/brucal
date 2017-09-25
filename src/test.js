const test = require('tape');
const {parseWeeks} = require('./');

test('parseWeeks', t => {
  t.plan(4)
  t.deepEqual(parseWeeks('1'), [1])
  t.deepEqual(parseWeeks('1, 3'), [1, 3]);
  t.deepEqual(parseWeeks('1-2, 4-5'), [1, 2, 4, 5]);
  t.deepEqual(parseWeeks('12-14, 4-5'), [12, 13, 14, 4, 5]);
});