type Step = {
	(delay: number): number;
};

interface Delay {
	initial: number;
	step: Step;
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

		delay?.initial && delay?.initial <= 0 && (delay.initial = 0);

		this.#delay = {
			initial: delay?.initial ?? 1_000,
			step: delay?.step ?? (v => v * 2),
		};

		this.#actualDelay = this.#delay.initial;
		this.#attempts = 0;
	}

	retry(callback: (attempt?: number) => boolean): boolean {
		if (this.exhaustedAttempts) return false;

		setTimeout(() => {
			const result = callback(this.attempts);
			this.#attempts++;
			this.stepUp();

			!result && this.retry(callback);
		}, this.delay);

		return true;
	}

	private stepUp(): void {
		this.#actualDelay = this.#delay.step(this.#actualDelay);
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
