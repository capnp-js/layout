/* @flow */

import test from "ava";

import { structBytes, structHi } from "../../src/struct";

test("`structBytes`", t => {
  t.plan(2);

  const hi = 0x021a21a3;
  const bytes = structBytes(hi);
  t.is((hi & 0x0000ffff) << 3, bytes.data);
  t.is((hi & 0xffff0000) >>> (16 - 3), bytes.pointers);
});

test("`structHi`", t => {
  const hi = structHi({data: 1032, pointers: 8208});
  t.is(hi, (1032>>>3) | (8208<<13));
});
