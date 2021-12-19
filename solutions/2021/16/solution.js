import { inspect } from 'util';


function hexToBinary(hexidecimal) {
  return hexidecimal.split('').map(dig => parseInt(dig, 16).toString(2).padStart(4, '0')).join('');
}

function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

function getGroup(packet, index, start = 0) {
  return packet.substring(start, start + index);
}


function getVersionType(packet, start) {
  const [version, type] = [getGroup(packet, 3, start), getGroup(packet, 3, start + 3)];
  return [binaryToDecimal(version), binaryToDecimal(type)];
}

function parseLiteral(packet, start, value = '') {
  const [identifier, ...group] = getGroup(packet, 5, start);
  start += 5;

  value += group.join('');

  if (Number(identifier)) {
    return parseLiteral(packet, start, value);
  }

  return [value, start];
}


const operatorMap = {
  0: 'add',
  1: 'product',
  2: 'minimum',
  3: 'maximum',
  5: 'greater',
  6: 'less',
  7: 'equal',
}


function parsePacket(packet, position = 0, message = {}) {
  const [version, type] = getVersionType(packet, position);
  position += 6
  message.version = version,
  message.type = type;
  message.operator = operatorMap[type];

  switch(type) {
    case 4:
      const [literal, newPosition] = parseLiteral(packet, position);
      message.literal = binaryToDecimal(literal);
      position = newPosition;
      break;
    default:
      const lengthType = getGroup(packet, 1, position);
      position += 1
      if (Number(lengthType)) {
        const subPacketCount = binaryToDecimal(getGroup(packet, 11, position));
        position += 11;
        message.subPackets = [...Array(subPacketCount).keys()].map(function() {
          const [packets, newPosition] = parsePacket(packet, position);
          position = newPosition;
          return packets;
        });
      } else {
        const subPacketLength = binaryToDecimal(getGroup(packet, 15, position));
        position += 15;
        message.subPackets = [];
        const finalPosition = position + subPacketLength;
        while (position < finalPosition) {
          const [packets, newPosition] = parsePacket(packet, position);
          position = newPosition;
          message.subPackets.push(packets);
        }
      }
  }

  return [message, position];
}


export function solution(input, treeProcessor) {
  const packets = input.map(hexToBinary);

  return packets.map(packet => parsePacket(packet)).map(([tree]) => treeProcessor(tree))
}

const operators = {
  add(array) {
    return array.reduce((a, b) => a + b);
  },
  product(array) {
    return array.reduce((a, b) => a * b);
  },
  minimum(array) {
    return Math.min(...array);
  },
  maximum(array) {
    return Math.max(...array);
  },
  greater([a, b]) {
    return Number(a > b);
  },
  less([a, b]) {
    return Number(a < b);
  },
  equal([a, b]) {
    return Number(a === b);
  }
}

function sumVersions({ version, subPackets = [] }) {
  return operators.add(subPackets.map(sumVersions).concat(version));
}

function processMessage({ literal, subPackets, operator }) {
  return literal || operators[operator](subPackets.map(processMessage));
}

export function silver(input) {
  return solution(input, sumVersions);
}

export function gold(input) {
  return solution(input, processMessage);
}

    // console.log(inspect(message, {showHidden: false, depth: null, colors: true}))
    // console.log(processMessage(message))
    // console.log();

