/* @flow */

import type { Bytes } from "./index";

type i32 = number;

export function structBytes(hi: i32): Bytes {
  return {
    data: ((hi & 0x0000ffff) << 3) >>> 0,
    pointers: (hi & 0xffff0000) >>> 13,
  };
}

export function structHi(bytes: Bytes): i32 {
  return (bytes.pointers << 13) | (bytes.data >>> 3);
}
