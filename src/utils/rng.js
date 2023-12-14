// Youtube video using this: https://youtu.be/ALKqavp9Fg0?si=_5O7Y6yvs3dbaAL8
// Final example in paint worklet: https://static-misc-3.glitch.me/203-paint-worklet/

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
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

// https://github.com/bryc/code/blob/master/jshash/PRNGs.md#splitmix32
class SplitMix32 {
	/** @param {number} seed */
	constructor(seed) {
		this.state = seed;
	}

	next() {
		this.state |= 0;
		this.state = (this.state + 0x9e3779b9) | 0;
		var t = this.state ^ (this.state >>> 15);
		t = Math.imul(t, 0x85ebca6b);
		t = t ^ (t >>> 13);
		t = Math.imul(t, 0xc2b2ae35);
		return ((t = t ^ (t >>> 16)) >>> 0) / 4294967296;
	}

	fork() {
		return new SplitMix32(this.next() * 2 ** 32);
	}
}

/** @type {(seed: number) => SplitMix32} */
export function createSplitMix32(seed) {
	return new SplitMix32(seed);
}
