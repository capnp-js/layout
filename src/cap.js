/* @flow */

import type { Pointer, SegmentR } from "@capnp-js/memory";
import type { CapLayout } from "./index";

export default function capLayout(p: Pointer<SegmentR>): CapLayout {
  return {
    tag: "cap",
    index: p.hi >>> 0,
  };
}
