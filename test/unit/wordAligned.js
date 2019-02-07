/* @flow */

import * as assert from "assert";
import { describe, it } from "mocha";

import { boolListBytes, nonboolListBytes, bytes } from "../../src/wordAligned";

describe("wordAligned.boolListBytes", function () {
  it("aligns bit counts to the next highest word", function () {
    assert.equal(boolListBytes(0), 0);
    assert.equal(boolListBytes(1), 8);
    assert.equal(boolListBytes(7), 8);
    assert.equal(boolListBytes(8), 8);
    assert.equal(boolListBytes(15), 8);
    assert.equal(boolListBytes(21), 8);
    assert.equal(boolListBytes(33), 8);
    assert.equal(boolListBytes(43), 8);
    assert.equal(boolListBytes(63), 8);
    assert.equal(boolListBytes(64), 8);
    assert.equal(boolListBytes(65), 16);
  });
});

describe("wordAligned.nonboolListBytes", function () {
  it("aligns 0x00 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(0, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(7, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(8, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(9, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(63, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(64, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
    assert.equal(nonboolListBytes(65, { flag: 0x00, bytes: { data: 0, pointers: 0 } }), 0);
  });

  it("aligns 0x02 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 8);
    assert.equal(nonboolListBytes(8, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 8);
    assert.equal(nonboolListBytes(9, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 16);
    assert.equal(nonboolListBytes(63, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 64);
    assert.equal(nonboolListBytes(64, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 64);
    assert.equal(nonboolListBytes(65, { flag: 0x02, bytes: { data: 1, pointers: 0 } }), 72);
  });

  it("aligns 0x03 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 16);
    assert.equal(nonboolListBytes(8, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 16);
    assert.equal(nonboolListBytes(9, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 24);
    assert.equal(nonboolListBytes(63, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 128);
    assert.equal(nonboolListBytes(64, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 128);
    assert.equal(nonboolListBytes(65, { flag: 0x03, bytes: { data: 2, pointers: 0 } }), 136);
  });

  it("aligns 0x04 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 32);
    assert.equal(nonboolListBytes(8, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 32);
    assert.equal(nonboolListBytes(9, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 40);
    assert.equal(nonboolListBytes(63, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 256);
    assert.equal(nonboolListBytes(64, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 256);
    assert.equal(nonboolListBytes(65, { flag: 0x04, bytes: { data: 4, pointers: 0 } }), 264);
  });

  it("aligns 0x05 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 56);
    assert.equal(nonboolListBytes(8, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 64);
    assert.equal(nonboolListBytes(9, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 72);
    assert.equal(nonboolListBytes(63, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 504);
    assert.equal(nonboolListBytes(64, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 512);
    assert.equal(nonboolListBytes(65, { flag: 0x05, bytes: { data: 8, pointers: 0 } }), 520);
  });

  it("aligns 0x06 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 56);
    assert.equal(nonboolListBytes(8, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 64);
    assert.equal(nonboolListBytes(9, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 72);
    assert.equal(nonboolListBytes(63, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 504);
    assert.equal(nonboolListBytes(64, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 512);
    assert.equal(nonboolListBytes(65, { flag: 0x06, bytes: { data: 0, pointers: 8 } }), 520);
  });

  it("aligns 0x07 list element counts to the next highest word", function () {
    assert.equal(nonboolListBytes(7, { flag: 0x07, bytes: { data: 8, pointers: 32 } }), 8+280);
    assert.equal(nonboolListBytes(8, { flag: 0x07, bytes: { data: 8, pointers: 16 } }), 8+192);
    assert.equal(nonboolListBytes(9, { flag: 0x07, bytes: { data: 40, pointers: 8 } }), 8+432);
    assert.equal(nonboolListBytes(63, { flag: 0x07, bytes: { data: 16, pointers: 8 } }), 8+1512);
    assert.equal(nonboolListBytes(64, { flag: 0x07, bytes: { data: 24, pointers: 8 } }), 8+2048);
    assert.equal(nonboolListBytes(65, { flag: 0x07, bytes: { data: 24, pointers: 8 } }), 8+2080);
  });
});
