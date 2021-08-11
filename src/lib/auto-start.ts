interface Delay {
	initial: number;
	step: number;
}

type Settings = {
	delay: Partial<Delay>;
	attempts: number;
};

export default class AutoStart {
	static DEFAULT_MAX_ATTEMPTS = 4;
	#attempts: number;
	#maxAttempts: number;
	#delay: Delay;
	#actualDelay: number; // in miliseconds;

	constructor({ delay, attempts: maxAttempts }: Partial<Settings> = {}) {
		this.#maxAttempts = maxAttempts ?? AutoStart.DEFAULT_MAX_ATTEMPTS;

		if (delay?.step && delay.step <= 0) {
			throw new Error("AutoStart step must be a positive number");
		}

		delay?.initial && delay?.initial <= 0 && (delay.initial = 0);

		this.#delay = {
			initial: delay?.initial ?? 1_000,
			step: delay?.step ?? 2,
		};

		this.#actualDelay = this.#delay.initial;
		this.#attempts = 0;
	}

	retry(callback?: (...args: unknown[]) => unknown): boolean {
		if (!this.exhaustedAttempts) {
			setTimeout(() => {
				callback?.();
				this.#attempts++;
				this.stepUp();
			}, this.delay);

			return true;
		}

		return false;
	}

	private stepUp(): void {
		this.#actualDelay *= this.#delay.step;
	}

	get delay(): number {
		return this.#actualDelay;
	}

	get attempts(): number {
		return this.#attempts;
	}

	get exhaustedAttempts(): boolean {
		return this.#attempts >= this.#maxAttempts;
	}
}
