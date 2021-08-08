import type { ServiceControl } from "./types";

interface Delay {
	initial: number;
	step: number;
}

type Settings = {
	delay: Partial<Delay>;
	maxRetries: number;
};

export default class AutoStart {
	private static MAX_RETRIES = 4;
	#retries = 0;
	#maxRetries: number;
	#delay: Delay;
	#currentDelay: number; // in miliseconds;
	#service: ServiceControl;

	constructor(
		service: ServiceControl,
		{ delay, maxRetries }: Partial<Settings> = {}
	) {
		this.#service = service;
		this.#maxRetries = maxRetries ?? AutoStart.MAX_RETRIES;

		this.#delay = {
			initial: delay?.initial ?? 1_000,
			step: delay?.step ?? 2,
		};

		this.#currentDelay = this.#delay.initial;
	}

	retry(): boolean {
		if (!this.exhaustedAttempts) {
			setTimeout(() => {
				if (this.#service.running) {
					this.#service.stop();
				}

				this.#service.start();

				this.#retries++;
				this.stepUp();
			}, this.delay);

			return true;
		}

		return false;
	}

	private stepUp(): void {
		this.#currentDelay *= this.#delay.step;
	}

	get delay(): number {
		return this.#currentDelay;
	}

	get retries(): number {
		return this.#retries;
	}

	get exhaustedAttempts(): boolean {
		return this.#retries >= this.#maxRetries;
	}
}
