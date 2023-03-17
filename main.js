class n {
    constructor() {
        this._dataLength = 0,
            this._bufferLength = 0,
            this._state = new Int32Array(4),
            this._buffer = new ArrayBuffer(68),
            this._buffer8 = new Uint8Array(this._buffer, 0, 68),
            this._buffer32 = new Uint32Array(this._buffer, 0, 17),
            this.start()
    }

    static hashStr(e, t = !1) {
        return this.onePassHasher.start().appendStr(e).end(t)
    }

    static hashAsciiStr(e, t = !1) {
        return this.onePassHasher.start().appendAsciiStr(e).end(t)
    }

    static _hex(e) {
        const t = n.hexChars
            , r = n.hexOut;
        let i, o, a, s;
        for (s = 0; s < 4; s += 1)
            for (o = 8 * s,
                     i = e[s],
                     a = 0; a < 8; a += 2)
                r[o + 1 + a] = t.charAt(15 & i),
                    i >>>= 4,
                    r[o + 0 + a] = t.charAt(15 & i),
                    i >>>= 4;
        return r.join("")
    }

    static _md5cycle(e, t) {
        let r = e[0]
            , n = e[1]
            , i = e[2]
            , o = e[3];
        r += (n & i | ~n & o) + t[0] - 680876936 | 0,
            r = (r << 7 | r >>> 25) + n | 0,
            o += (r & n | ~r & i) + t[1] - 389564586 | 0,
            o = (o << 12 | o >>> 20) + r | 0,
            i += (o & r | ~o & n) + t[2] + 606105819 | 0,
            i = (i << 17 | i >>> 15) + o | 0,
            n += (i & o | ~i & r) + t[3] - 1044525330 | 0,
            n = (n << 22 | n >>> 10) + i | 0,
            r += (n & i | ~n & o) + t[4] - 176418897 | 0,
            r = (r << 7 | r >>> 25) + n | 0,
            o += (r & n | ~r & i) + t[5] + 1200080426 | 0,
            o = (o << 12 | o >>> 20) + r | 0,
            i += (o & r | ~o & n) + t[6] - 1473231341 | 0,
            i = (i << 17 | i >>> 15) + o | 0,
            n += (i & o | ~i & r) + t[7] - 45705983 | 0,
            n = (n << 22 | n >>> 10) + i | 0,
            r += (n & i | ~n & o) + t[8] + 1770035416 | 0,
            r = (r << 7 | r >>> 25) + n | 0,
            o += (r & n | ~r & i) + t[9] - 1958414417 | 0,
            o = (o << 12 | o >>> 20) + r | 0,
            i += (o & r | ~o & n) + t[10] - 42063 | 0,
            i = (i << 17 | i >>> 15) + o | 0,
            n += (i & o | ~i & r) + t[11] - 1990404162 | 0,
            n = (n << 22 | n >>> 10) + i | 0,
            r += (n & i | ~n & o) + t[12] + 1804603682 | 0,
            r = (r << 7 | r >>> 25) + n | 0,
            o += (r & n | ~r & i) + t[13] - 40341101 | 0,
            o = (o << 12 | o >>> 20) + r | 0,
            i += (o & r | ~o & n) + t[14] - 1502002290 | 0,
            i = (i << 17 | i >>> 15) + o | 0,
            n += (i & o | ~i & r) + t[15] + 1236535329 | 0,
            n = (n << 22 | n >>> 10) + i | 0,
            r += (n & o | i & ~o) + t[1] - 165796510 | 0,
            r = (r << 5 | r >>> 27) + n | 0,
            o += (r & i | n & ~i) + t[6] - 1069501632 | 0,
            o = (o << 9 | o >>> 23) + r | 0,
            i += (o & n | r & ~n) + t[11] + 643717713 | 0,
            i = (i << 14 | i >>> 18) + o | 0,
            n += (i & r | o & ~r) + t[0] - 373897302 | 0,
            n = (n << 20 | n >>> 12) + i | 0,
            r += (n & o | i & ~o) + t[5] - 701558691 | 0,
            r = (r << 5 | r >>> 27) + n | 0,
            o += (r & i | n & ~i) + t[10] + 38016083 | 0,
            o = (o << 9 | o >>> 23) + r | 0,
            i += (o & n | r & ~n) + t[15] - 660478335 | 0,
            i = (i << 14 | i >>> 18) + o | 0,
            n += (i & r | o & ~r) + t[4] - 405537848 | 0,
            n = (n << 20 | n >>> 12) + i | 0,
            r += (n & o | i & ~o) + t[9] + 568446438 | 0,
            r = (r << 5 | r >>> 27) + n | 0,
            o += (r & i | n & ~i) + t[14] - 1019803690 | 0,
            o = (o << 9 | o >>> 23) + r | 0,
            i += (o & n | r & ~n) + t[3] - 187363961 | 0,
            i = (i << 14 | i >>> 18) + o | 0,
            n += (i & r | o & ~r) + t[8] + 1163531501 | 0,
            n = (n << 20 | n >>> 12) + i | 0,
            r += (n & o | i & ~o) + t[13] - 1444681467 | 0,
            r = (r << 5 | r >>> 27) + n | 0,
            o += (r & i | n & ~i) + t[2] - 51403784 | 0,
            o = (o << 9 | o >>> 23) + r | 0,
            i += (o & n | r & ~n) + t[7] + 1735328473 | 0,
            i = (i << 14 | i >>> 18) + o | 0,
            n += (i & r | o & ~r) + t[12] - 1926607734 | 0,
            n = (n << 20 | n >>> 12) + i | 0,
            r += (n ^ i ^ o) + t[5] - 378558 | 0,
            r = (r << 4 | r >>> 28) + n | 0,
            o += (r ^ n ^ i) + t[8] - 2022574463 | 0,
            o = (o << 11 | o >>> 21) + r | 0,
            i += (o ^ r ^ n) + t[11] + 1839030562 | 0,
            i = (i << 16 | i >>> 16) + o | 0,
            n += (i ^ o ^ r) + t[14] - 35309556 | 0,
            n = (n << 23 | n >>> 9) + i | 0,
            r += (n ^ i ^ o) + t[1] - 1530992060 | 0,
            r = (r << 4 | r >>> 28) + n | 0,
            o += (r ^ n ^ i) + t[4] + 1272893353 | 0,
            o = (o << 11 | o >>> 21) + r | 0,
            i += (o ^ r ^ n) + t[7] - 155497632 | 0,
            i = (i << 16 | i >>> 16) + o | 0,
            n += (i ^ o ^ r) + t[10] - 1094730640 | 0,
            n = (n << 23 | n >>> 9) + i | 0,
            r += (n ^ i ^ o) + t[13] + 681279174 | 0,
            r = (r << 4 | r >>> 28) + n | 0,
            o += (r ^ n ^ i) + t[0] - 358537222 | 0,
            o = (o << 11 | o >>> 21) + r | 0,
            i += (o ^ r ^ n) + t[3] - 722521979 | 0,
            i = (i << 16 | i >>> 16) + o | 0,
            n += (i ^ o ^ r) + t[6] + 76029189 | 0,
            n = (n << 23 | n >>> 9) + i | 0,
            r += (n ^ i ^ o) + t[9] - 640364487 | 0,
            r = (r << 4 | r >>> 28) + n | 0,
            o += (r ^ n ^ i) + t[12] - 421815835 | 0,
            o = (o << 11 | o >>> 21) + r | 0,
            i += (o ^ r ^ n) + t[15] + 530742520 | 0,
            i = (i << 16 | i >>> 16) + o | 0,
            n += (i ^ o ^ r) + t[2] - 995338651 | 0,
            n = (n << 23 | n >>> 9) + i | 0,
            r += (i ^ (n | ~o)) + t[0] - 198630844 | 0,
            r = (r << 6 | r >>> 26) + n | 0,
            o += (n ^ (r | ~i)) + t[7] + 1126891415 | 0,
            o = (o << 10 | o >>> 22) + r | 0,
            i += (r ^ (o | ~n)) + t[14] - 1416354905 | 0,
        i = (i << 15 | i >>> 17) + o | 0,
        n += (o ^ (i | ~r)) + t[5] - 57434055 | 0,
        n = (n << 21 | n >>> 11) + i | 0,
        r += (i ^ (n | ~o)) + t[12] + 1700485571 | 0,
        r = (r << 6 | r >>> 26) + n | 0,
        o += (n ^ (r | ~i)) + t[3] - 1894986606 | 0,
        o = (o << 10 | o >>> 22) + r | 0,
        i += (r ^ (o | ~n)) + t[10] - 1051523 | 0,
        i = (i << 15 | i >>> 17) + o | 0,
        n += (o ^ (i | ~r)) + t[1] - 2054922799 | 0,
        n = (n << 21 | n >>> 11) + i | 0,
        r += (i ^ (n | ~o)) + t[8] + 1873313359 | 0,
        r = (r << 6 | r >>> 26) + n | 0,
        o += (n ^ (r | ~i)) + t[15] - 30611744 | 0,
        o = (o << 10 | o >>> 22) + r | 0,
        i += (r ^ (o | ~n)) + t[6] - 1560198380 | 0,
        i = (i << 15 | i >>> 17) + o | 0,
        n += (o ^ (i | ~r)) + t[13] + 1309151649 | 0,
        n = (n << 21 | n >>> 11) + i | 0,
        r += (i ^ (n | ~o)) + t[4] - 145523070 | 0,
        r = (r << 6 | r >>> 26) + n | 0,
        o += (n ^ (r | ~i)) + t[11] - 1120210379 | 0,
        o = (o << 10 | o >>> 22) + r | 0,
        i += (r ^ (o | ~n)) + t[2] + 718787259 | 0,
        i = (i << 15 | i >>> 17) + o | 0,
        n += (o ^ (i | ~r)) + t[9] - 343485551 | 0,
        n = (n << 21 | n >>> 11) + i | 0,
        e[0] = r + e[0] | 0,
        e[1] = n + e[1] | 0,
        e[2] = i + e[2] | 0,
        e[3] = o + e[3] | 0
    }

    start() {
        return this._dataLength = 0,
            this._bufferLength = 0,
            this._state.set(n.stateIdentity),
            this
    }

    appendStr(e) {
        const t = this._buffer8
            , r = this._buffer32;
        let i, o, a = this._bufferLength;
        for (o = 0; o < e.length; o += 1) {
            if (i = e.charCodeAt(o),
            i < 128)
                t[a++] = i;
            else if (i < 2048)
                t[a++] = 192 + (i >>> 6),
                    t[a++] = 63 & i | 128;
            else if (i < 55296 || i > 56319)
                t[a++] = 224 + (i >>> 12),
                    t[a++] = i >>> 6 & 63 | 128,
                    t[a++] = 63 & i | 128;
            else {
                if (i = 1024 * (i - 55296) + (e.charCodeAt(++o) - 56320) + 65536,
                i > 1114111)
                    throw new Error("Unicode standard supports code points up to U+10FFFF");
                t[a++] = 240 + (i >>> 18),
                    t[a++] = i >>> 12 & 63 | 128,
                    t[a++] = i >>> 6 & 63 | 128,
                    t[a++] = 63 & i | 128
            }
            a >= 64 && (this._dataLength += 64,
                n._md5cycle(this._state, r),
                a -= 64,
                r[0] = r[16])
        }
        return this._bufferLength = a,
            this
    }

    appendAsciiStr(e) {
        const t = this._buffer8
            , r = this._buffer32;
        let i, o = this._bufferLength, a = 0;
        for (; ;) {
            for (i = Math.min(e.length - a, 64 - o); i--;)
                t[o++] = e.charCodeAt(a++);
            if (o < 64)
                break;
            this._dataLength += 64,
                n._md5cycle(this._state, r),
                o = 0
        }
        return this._bufferLength = o,
            this
    }

    appendByteArray(e) {
        const t = this._buffer8
            , r = this._buffer32;
        let i, o = this._bufferLength, a = 0;
        for (; ;) {
            for (i = Math.min(e.length - a, 64 - o); i--;)
                t[o++] = e[a++];
            if (o < 64)
                break;
            this._dataLength += 64,
                n._md5cycle(this._state, r),
                o = 0
        }
        return this._bufferLength = o,
            this
    }

    getState() {
        const e = this._state;
        return {
            buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
            buflen: this._bufferLength,
            length: this._dataLength,
            state: [e[0], e[1], e[2], e[3]]
        }
    }

    setState(e) {
        const t = e.buffer
            , r = e.state
            , n = this._state;
        let i;
        for (this._dataLength = e.length,
                 this._bufferLength = e.buflen,
                 n[0] = r[0],
                 n[1] = r[1],
                 n[2] = r[2],
                 n[3] = r[3],
                 i = 0; i < t.length; i += 1)
            this._buffer8[i] = t.charCodeAt(i)
    }

    end(e = !1) {
        const t = this._bufferLength
            , r = this._buffer8
            , i = this._buffer32
            , o = 1 + (t >> 2);
        this._dataLength += t;
        const a = 8 * this._dataLength;
        if (r[t] = 128,
            r[t + 1] = r[t + 2] = r[t + 3] = 0,
            i.set(n.buffer32Identity.subarray(o), o),
        t > 55 && (n._md5cycle(this._state, i),
            i.set(n.buffer32Identity)),
        a <= 4294967295)
            i[14] = a;
        else {
            const e = a.toString(16).match(/(.*?)(.{0,8})$/);
            if (null === e)
                return;
            const t = parseInt(e[2], 16)
                , r = parseInt(e[1], 16) || 0;
            i[14] = t,
                i[15] = r
        }
        return n._md5cycle(this._state, i),
            e ? this._state : n._hex(this._state)
    }
}

if (n.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]),
    n.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    n.hexChars = "0123456789abcdef",
    n.hexOut = [],
    n.onePassHasher = new n,
"5d41402abc4b2a76b9719d911017c592" !== n.hashStr("hello"))
    throw new Error("Md5 self test failed.");

var i = function (e) {
    var t = new Date;
    return {
        "xx-spk-mit": n.hashStr("".concat(e).concat(t.toString())),
        "xx-time": t
    }
}
var mrx = i("hello")
console.log(mrx)
