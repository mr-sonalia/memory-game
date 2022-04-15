const TICK_SECONDS = 1000;

class IClock {
	#h;
	#m;
	#s;

	constructor(h, m, s) {
		this.ticksecs = TICK_SECONDS;
		this.interval = null;

		this.#h = h;
		this.#m = m;
		this.#s = s;

		this.startTicking = function () {
			// setInterval(() => console.log("Start ticking", this), 1000);
			let mins = `${this.#m}`.padStart(2, "0");
			let hours = `${this.#h}`.padStart(2, "0");
			let secs = `${this.#s}`.padStart(2, "0");

			if (!this.interval)
				this.interval = setInterval(() => this.tick(), this.ticksecs);
			else postMessage({ hours, mins, secs });
		};

		this.tick = function () {
			let mins;
			let hours;
			let secs;
			let flag = true; // false if we don't want to preview 'seconds'.

			this.#s = parseFloat(this.#s) + 1;
			if (this.#s == 60) {
				flag = true;
				this.#m = parseFloat(this.#m) + 1;
				if (this.#m == 60) {
					this.#h = parseFloat(this.#h) + 1;
					this.#m = 0;
				}
				if (this.#h == 24) {
					this.#h = 0;
				}
				this.#s = 0;
			}
			if (flag) {
				mins = `${this.#m}`.padStart(2, "0");
				hours = `${this.#h}`.padStart(2, "0");
				secs = `${this.#s}`.padStart(2, "0");

				postMessage({ hours, mins, secs });
			}
		};

		this.stopTicking = function () {
			clearInterval(this.interval);
			this.interval = null;
		};
	}
}

onmessage = ({ data }) => {
	return new IClock(data.hours, data.mins, data.secs).startTicking();
};
