export default class IPv4Address extends Uint8ClampedArray {
  constructor(init = 4, ...otherArgs) {
    super(init, ...otherArgs);

    if (this.length !== 4) {
      throw new RangeError('IPv4Address: Length must be 4');
    }
  }

  toString() {
    return this.join('.');
  }
}

Object.defineProperties(IPv4Address, {
  parse: {
    value: function(str) {
      const parts = String(str)
        .split('.')
        .map(Number);

      if (parts.some(part => isNaN(part))) {
        throw new TypeError("IPv4Address: Some parts of the IP-address arent't numbers");
      }

      return new this(parts);
    },
    writable: true,
    configurable: true
  }
});