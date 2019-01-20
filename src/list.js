/* @flow */

import type { NonboolListEncoding } from "./index";

type u29 = number;
type u30 = number;
type u32 = number;

export function boolListHi(length: u29): u32 {
  return 0x01 | length<<3;
}

export function nonboolListHi(encoding: NonboolListEncoding, length: u29 | u30): u32 {
  if (encoding.flag === 0x07) {
    const bytes = length * (encoding.bytes.data + encoding.bytes.pointers);
    return 0x07 | bytes; /* bytes \equiv words<<3 */
  } else {
    return encoding.flag | length<<3;
  }
}
