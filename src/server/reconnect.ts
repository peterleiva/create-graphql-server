import { HttpServer } from "./server";

export interface Retry {
	retry: (server: HttpServer) => number | false;
}

interface Delay {
	step: number;
	initial: number;
}

export class Reconnect {
	static MAX_RETRIES = 4;
	#retries = 0;
	#delayMultiplier: number;
	#initialDelay: number; // in miliseconds
	#currentDelay: number; // in miliseconds;
	#server: HttpServer;

	constructor(server: HttpServer, delay?: Partial<Delay>) {
		this.#server = server;
		this.#initialDelay = delay?.initial ?? 1_000;
		this.#delayMultiplier = delay?.step ?? 2;

		this.#currentDelay = this.#initialDelay;
	}

	retry(): boolean {
		if (!this.exhaustedAttempts) {
			setTimeout(() => {
				if (this.#server.isRunning()) {
					this.#server.stop();
				}

				this.#server.start();

				this.#retries++;
				this.incrementDelay();
			}, this.delay);

			return true;
		}

		return false;
	}

	private incrementDelay(): void {
		this.#currentDelay *= this.#delayMultiplier;
	}

	get delay(): number {
		return this.#currentDelay;
	}

	get retries(): number {
		return this.#retries;
	}

	get exhaustedAttempts(): boolean {
		return this.#retries >= Reconnect.MAX_RETRIES;
	}
}
