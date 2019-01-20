/* @flow */

import type { Bytes, NonboolListEncoding } from "./index";

type uint = number;
type u29 = number;
type u30 = number;

export function boolListBytes(length: u29): uint { //TODO: shouldn't the return type be u26 or something?
  /* Convert bits to word aligned bytes. */
  return ((length >>> 6) + (length & 0x3f ? 1 : 0)) << 3;
}

function nontagBytes(length: u29 | u30, bs: Bytes): uint {
  const byteCount = length * (bs.data + bs.pointers);

  /* Word align the bytes. */
  const rem = byteCount % 8;
  return rem === 0 ? byteCount : byteCount + 8-rem;
}

export function nonboolListBytes(length: u29 | u30, encoding: NonboolListEncoding): uint {
  const byteCount = nontagBytes(length, encoding.bytes);
  return encoding.flag === 0x07 ? 8 + byteCount : byteCount;
}

export function bytes(length: u29 | u30): uint {
  return (length & 0xffffffff8) + (length & 0x07 ? 8 : 0);
}
