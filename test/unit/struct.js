/* @flow */

import * as assert from "assert";
import { describe, it } from "mocha";

import { structBytes, structHi } from "../../src/struct";

describe("structBytes", function () {
  it("computes the hi bit pattern for structs", function () {
    const hi = 0x021a21a3;
    const bytes = structBytes(hi);
    assert.equal((hi & 0x0000ffff) << 3, bytes.data);
    assert.equal((hi & 0xffff0000) >>> (16 - 3), bytes.pointers);
  });
});

describe("structHi", function () {
  it("computes the hi bit pattern for structs", function () {
    const hi = structHi({data: 1032, pointers: 8208});
    assert.equal(hi, (1032>>>3) | (8208<<13));
  });
});
