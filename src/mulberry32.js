class Mulberry32 {
	/** @param {number} seed */
	constructor(seed) {
		this.state = seed;
	}

	next() {
		this.state |= 0;
		this.state = (this.state + 0x6d2b79f5) | 0;
		var t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	}

	fork() {
		return new Mulberry32(this.next() * 2 ** 32);
	}
}

/** @type {(seed: number) => Mulberry32} */
export function createMulberry32(seed) {
	return new Mulberry32(seed);
}
