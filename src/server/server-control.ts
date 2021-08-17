import type { Server } from "http";
import { ServiceControl, ServiceControlEvents } from "lib";
import { EventEmitter } from "events";
import { AddressInfo } from "net";

type ControlOptions = {
	port: number;
};

export default class ServerControl
	extends EventEmitter
	implements ServiceControl<ControlOptions>, ServiceControlEvents
{
	readonly #server: Server;
	#port: number | null;

	constructor(server: Server) {
		super();
		this.#server = server;
		this.#port = null;

		this.#server.on("error", error => this.emit("error", error));
		this.#server.on("listening", () => this.emit("started", this.#server));
	}

	get server(): Server {
		return this.#server;
	}

	get running(): boolean {
		return this.#server.listening;
	}

	get port(): number | null {
		if (!this.running) {
			return null;
		}

		return this.#port;
	}

	start({ port }: ControlOptions): this {
		this.emit("starting", this.#server);
		this.#server.listen(port);

		this.#port =
			port === 0 ? (this.#server.address() as AddressInfo).port : port;

		return this;
	}

	stop(): this {
		if (this.running) {
			this.#server.close(err => {
				if (err) {
					console.error(`Error closing the http server`);
					throw err;
				}
				this.emit("stopped");
				console.warn(`❌ Http server closed`);
			});
		}

		return this;
	}

	restart(options: ControlOptions): this {
		this.stop();
		this.start(options);

		return this;
	}
}
