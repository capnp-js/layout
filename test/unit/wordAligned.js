/* @flow */

import test from "ava";

import { boolListBytes, nonboolListBytes, bytes } from "../../src/wordAligned";

test("`boolListBytes`", t => {
  t.plan(11);

  t.is(boolListBytes(0), 0);
  t.is(boolListBytes(1), 8);
  t.is(boolListBytes(7), 8);
  t.is(boolListBytes(8), 8);
  t.is(boolListBytes(15), 8);
  t.is(boolListBytes(21), 8);
  t.is(boolListBytes(33), 8);
  t.is(boolListBytes(43), 8);
  t.is(boolListBytes(63), 8);
  t.is(boolListBytes(64), 8);
  t.is(boolListBytes(65), 16);
});

test("`nonboolListBytes` for void", t => {
  t.plan(7);

  t.is(nonboolListBytes(0, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(7, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(8, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(9, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(63, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(64, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  t.is(nonboolListBytes(65, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
});

test("`nonboolListBytes` for 1 byte", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 8);
  t.is(nonboolListBytes(8, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 8);
  t.is(nonboolListBytes(9, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 16);
  t.is(nonboolListBytes(63, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 64);
  t.is(nonboolListBytes(64, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 64);
  t.is(nonboolListBytes(65, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 72);
});

test("`nonboolListBytes` for 2 byte", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 16);
  t.is(nonboolListBytes(8, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 16);
  t.is(nonboolListBytes(9, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 24);
  t.is(nonboolListBytes(63, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 128);
  t.is(nonboolListBytes(64, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 128);
  t.is(nonboolListBytes(65, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 136);
});

test("`nonboolListBytes` for 4 byte", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 32);
  t.is(nonboolListBytes(8, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 32);
  t.is(nonboolListBytes(9, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 40);
  t.is(nonboolListBytes(63, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 256);
  t.is(nonboolListBytes(64, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 256);
  t.is(nonboolListBytes(65, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 264);
});

test("`nonboolListBytes` for 8 data byte", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 56);
  t.is(nonboolListBytes(8, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 64);
  t.is(nonboolListBytes(9, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 72);
  t.is(nonboolListBytes(63, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 504);
  t.is(nonboolListBytes(64, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 512);
  t.is(nonboolListBytes(65, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 520);
});

test("`nonboolListBytes` for 8 pointers byte", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 56);
  t.is(nonboolListBytes(8, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 64);
  t.is(nonboolListBytes(9, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 72);
  t.is(nonboolListBytes(63, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 504);
  t.is(nonboolListBytes(64, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 512);
  t.is(nonboolListBytes(65, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 520);
});

test("`nonboolListBytes` for struct", t => {
  t.plan(6);

  t.is(nonboolListBytes(7, { flag: 0x07, bytes: { data: 8, pointers: 32 } }), 8+280);
  t.is(nonboolListBytes(8, { flag: 0x07, bytes: { data: 8, pointers: 16 } }), 8+192);
  t.is(nonboolListBytes(9, { flag: 0x07, bytes: { data: 40, pointers: 8 } }), 8+432);
  t.is(nonboolListBytes(63, { flag: 0x07, bytes: { data: 16, pointers: 8 } }), 8+1512);
  t.is(nonboolListBytes(64, { flag: 0x07, bytes: { data: 24, pointers: 8 } }), 8+2048);
  t.is(nonboolListBytes(65, { flag: 0x07, bytes: { data: 24, pointers: 8 } }), 8+2080);
});
