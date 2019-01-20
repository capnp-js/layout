/* @flow */

import type { Bytes, NonboolListEncoding, NonboolListFlag, SubwordFlag } from "./index";

/* Admissible struct upgrades: [data, pointers] -> [data+, pointers+]. */

export class StructSchemaTransitionError extends Error {
  +baseline: Bytes;
  +candidate: Bytes;

  constructor(baseline: Bytes, candidate: Bytes) {
    super();
    this.baseline = baseline;
    this.candidate = candidate;
  }
}

export function isStaleStruct(baseline: Bytes, candidate: Bytes): boolean {
  if (candidate.data < baseline.data || candidate.pointers < baseline.pointers) {
    /* The candidate struct may have been upgraded, but check for legitimacy. */
    if (candidate.data > baseline.data || candidate.pointers > baseline.pointers) {
      /* One candidate section is narrower than its baseline section, while the
       * other is wider than its baseline section. */
      throw new StructSchemaTransitionError(baseline, candidate);
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export class BoolListSchemaTransitionError extends Error {
  +candidate: NonboolListEncoding;

  constructor(candidate: NonboolListEncoding) {
    super();
    this.candidate = candidate;
  }
}

/* Admissible list upgrades:
 * * 0x00 -> [0x07, 0, 0]+
 * * 0x02 -> [0x07, 8, 0]+
 * * 0x03 -> [0x07, 8, 0]+
 * * 0x04 -> [0x07, 8, 0]+
 * * 0x05 -> [0x07, 8, 0]+
 * * 0x06 -> [0x07, 0, 8]+
 * * [0x07, data, pointers] -> [0x07, data+, pointers+] */

export class ListSchemaTransitionError extends Error {
  +baseline: NonboolListEncoding;
  +candidate: NonboolListEncoding;

  constructor(baseline: NonboolListEncoding, candidate: NonboolListEncoding) {
    super();
    this.baseline = baseline;
    this.candidate = candidate;
  }
}

const dataMinSize =     [0, null, 8, 8, 8, 8, 0];
const pointersMinSize = [0, null, 0, 0, 0, 0, 8];

export function isStaleList(baseline: NonboolListEncoding, candidate: NonboolListEncoding): boolean {
  if (baseline.flag === candidate.flag) {
    if (baseline.flag === 0x07) {
      return isStaleStruct(baseline.bytes, candidate.bytes);
    } else {
      return false;
    }
  } else if (baseline.flag === 0x07) {
    /* The `baseline.flag === candidate.flag` predicate above failed, so
     * `baseline.flag === 0x07` implies that `candidate.flag !== 0x07`. */
    if (
      baseline.bytes.data < dataMinSize[(((candidate.flag: NonboolListFlag): any): SubwordFlag)] // eslint-disable-line flowtype/no-weak-types
      || baseline.bytes.pointers < pointersMinSize[(((candidate.flag: NonboolListFlag): any): SubwordFlag)] // eslint-disable-line flowtype/no-weak-types
    ) {
      throw new ListSchemaTransitionError(baseline, candidate);
    } else {
      return true;
    }
  } else if (candidate.flag === 0x07) {
    /* The `baseline.flag === candidate.flag` predicate failed above, so
     * `candidate.flag === 0x07` implies that `baseline.flag !== 0x07`. */
    if (
      candidate.bytes.data < dataMinSize[(((baseline.flag: NonboolListFlag): any): SubwordFlag)] // eslint-disable-line flowtype/no-weak-types
      || candidate.bytes.pointers < pointersMinSize[(((baseline.flag: NonboolListFlag): any): SubwordFlag)] // eslint-disable-line flowtype/no-weak-types
    ) {
      throw new ListSchemaTransitionError(baseline, candidate);
    } else {
      return false;
    }
  } else {
    /* I already covered `baseline.flag === candidate.flag` earlier, so all that
     * remains is illegal transitions between subword list encodings. */
    throw new ListSchemaTransitionError(baseline, candidate);
  }
}
