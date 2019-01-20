/* @flow */

type uint = number;
type u19 = number;
type u29 = number;
type u30 = number;
type u32 = number;

//TODO: Change this name to disambiguate from BytesR and BytesB
export type Bytes = {
  +data: u19,
  +pointers: u19,
};

export type StructLayout = {
  +tag: "struct",
  +bytes: Bytes,
  +dataSection: uint,
  +pointersSection: uint,
  +end: uint,
};

export type ListLayout = {
  +length: u29 | u30;
};

export type BoolListLayout = {
  +tag: "bool list",
  +begin: uint,
  +length: u29,
};

export type SubwordFlag = 0x00 | 0x02 | 0x03 | 0x04 | 0x05 | 0x06;

export type NonboolListFlag = SubwordFlag | 0x07;

export type NonboolListEncoding = {
  +flag: NonboolListFlag,
  +bytes: Bytes,
};

export type NonboolListLayout = {
  +tag: "non-bool list",
  +encoding: NonboolListEncoding,
  +begin: uint,
  +length: u29 | u30,
};

export type CapLayout = {
  +tag: "cap",
  +index: u32,
};

export { default as cap } from "./cap";
export { default as listEncodings } from "./listEncodings";
export * from "./stale";
export * from "./struct";
export * from "./list";
import * as wa from "./wordAligned";
export const wordAligned = wa;
