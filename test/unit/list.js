/* @flow */

import * as assert from "assert";
import { describe, it } from "mocha";
import { int32 } from "@capnp-js/read-data";

import { boolListHi, nonboolListHi } from "../../src/list";

describe("boolListHi", function () {
  it("computes the hi bit pattern for bool lists", function () {
    const hi = boolListHi(264);
    assert.equal(hi, (264<<3) | 0x01);
  });
});

describe("nonboolListHi", function () {
  it("computes the hi bit pattern for 0x00 lists", function () {
    const hi = nonboolListHi({flag: 0x00, bytes: {data: 0, pointers: 0}}, 451);
    assert.equal(hi, (451<<3) | 0x00);
  });

  it("computes the hi bit pattern for 0x02 lists", function () {
    const hi = nonboolListHi({flag: 0x02, bytes: {data: 8, pointers: 0}}, 134);
    assert.equal(hi, (134<<3) | 0x02);
  });

  it("computes the hi bit pattern for 0x03 lists", function () {
    const hi = nonboolListHi({flag: 0x03, bytes: {data: 16, pointers: 0}}, 221);
    assert.equal(hi, (221<<3) | 0x03);
  });

  it("computes the hi bit pattern for 0x04 lists", function () {
    const hi = nonboolListHi({flag: 0x04, bytes: {data: 32, pointers: 0}}, 981);
    assert.equal(hi, (981<<3) | 0x04);
  });

  it("computes the hi bit pattern for 0x05 lists", function () {
    const hi = nonboolListHi({flag: 0x05, bytes: {data: 64, pointers: 0}}, 331);
    assert.equal(hi, (331<<3) | 0x05);
  });

  it("computes the hi bit pattern for 0x06 lists", function () {
    const hi = nonboolListHi({flag: 0x06, bytes: {data: 0, pointers: 8}}, 710);
    assert.equal(hi, (710<<3) | 0x06);
  });

  it("computes the hi bit pattern for 0x07 lists", function () {
    const hi = nonboolListHi({flag: 0x07, bytes: {data: 16, pointers: 584}}, 112);
    const words = (16 + 584) >>> 3
    assert.equal(hi, ((112*words)<<3) | 0x07);
  });
});
