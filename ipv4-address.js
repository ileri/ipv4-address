class Ipv4Address {
    constructor(iterable) {
        let arr = new Uint8Array(4);

        for(let i = 0; i < 4; ++i) {
            Object.defineProperty(this, i, {
                get: function() {
                    return arr[i];
                },
                set: function(val) {
                    arr[i] = val;
                },
                enumerable: true,
                configurable: true
            });
        }

        if(iterable) {
            let i = 0;

            for(let val of iterable) {
                if(i >= this.length) {
                    throw new RangeError("Ipv4Address: iterable is too long");
                }
                this[i++] = val >>> 0;
            }
        }
    }

    toString() {
        return Array.prototype.map.call(this, function(ele) {
            return ele.toString(10);
        }).join(".");
    }

    get length() {
        return 4;
    }

    * keys() {
        for(let i = 0; i < this.length; ++i) {
            yield i;
        }
    }

    * values() {
        for(let key of this.keys()) {
            yield this[key];
        }
    }

    * entries() {
        for(let key of this.keys()) {
            yield [key, this[key]];
        }
    }

    * [Symbol.iterator]() {
        return this.values();
    }
}

Ipv4Address.parse = function(str) {
    let parts = String(str).split(".");

    if(parts.length !== 4) {
        throw new Error("Ipv4Address: Expected '.' to occur exactly 3 times");
    }

    return new this(parts.map(function(part) {
        if(!/^[0-9]{1,3}$/.test(part)) {
            throw new Error(`Ipv6Address.parse: invalid part: '${part}'`);
        }
        return parseInt(part, 10);
    }));
};

export default Ipv4Address;