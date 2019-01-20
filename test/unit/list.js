/* @flow */

import test from "ava";

import { int32 } from "@capnp-js/read-data";

import { boolListHi, nonboolListHi } from "../../src/list";

test("`boolListHi`", t => {
  const hi = boolListHi(264);
  t.is(hi, (264<<3) | 0x01);
});

test("`nonboolListHi`", t => {
  t.plan(7);

  const hi0 = nonboolListHi({flag: 0x00, bytes: {data: 0, pointers: 0}}, 451);
  t.is(hi0, (451<<3) | 0x00);

  const hi2 = nonboolListHi({flag: 0x02, bytes: {data: 8, pointers: 0}}, 134);
  t.is(hi2, (134<<3) | 0x02);

  const hi3 = nonboolListHi({flag: 0x03, bytes: {data: 16, pointers: 0}}, 221);
  t.is(hi3, (221<<3) | 0x03);

  const hi4 = nonboolListHi({flag: 0x04, bytes: {data: 32, pointers: 0}}, 981);
  t.is(hi4, (981<<3) | 0x04);

  const hi5 = nonboolListHi({flag: 0x05, bytes: {data: 64, pointers: 0}}, 331);
  t.is(hi5, (331<<3) | 0x05);

  const hi6 = nonboolListHi({flag: 0x06, bytes: {data: 0, pointers: 8}}, 710);
  t.is(hi6, (710<<3) | 0x06);

  const hi7 = nonboolListHi({flag: 0x07, bytes: {data: 16, pointers: 584}}, 112);
  const words = (16 + 584) >>> 3
  t.is(hi7, ((112*words)<<3) | 0x07);
});
