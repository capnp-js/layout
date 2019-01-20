/* @flow */

type T = [
  {|
    flag: 0x00,
    bytes: {|
      data: 0,
      pointers: 0,
    |},
  |},
  null,
  {|
    flag: 0x02,
    bytes: {|
      data: 1,
      pointers: 0,
    |},
  |}, {|
    flag: 0x03,
    bytes: {|
      data: 2,
      pointers: 0,
    |},
  |}, {|
    flag: 0x04,
    bytes: {|
      data: 4,
      pointers: 0,
    |},
  |}, {|
    flag: 0x05,
    bytes: {|
      data: 8,
      pointers: 0,
    |},
  |}, {|
    flag: 0x06,
    bytes: {|
      data: 0,
      pointers: 8,
    |},
  |},
  null,
];

const listEncodings: T = [
  {
    flag: 0x00,
    bytes: {
      data: 0,
      pointers: 0,
    },
  },
  null,
  {
    flag: 0x02,
    bytes: {
      data: 1,
      pointers: 0,
    },
  }, {
    flag: 0x03,
    bytes: {
      data: 2,
      pointers: 0,
    },
  }, {
    flag: 0x04,
    bytes: {
      data: 4,
      pointers: 0,
    },
  }, {
    flag: 0x05,
    bytes: {
      data: 8,
      pointers: 0,
    },
  }, {
    flag: 0x06,
    bytes: {
      data: 0,
      pointers: 8,
    },
  },
  null,
];

export default listEncodings;
