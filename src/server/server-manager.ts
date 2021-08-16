import type { Server } from "http";
import type { Config } from "config";
import type { Application } from "express";
import { ServiceControl } from "lib";
import { EventEmitter } from "events";

type ControlOptions = {
	port: number;
};

type ServerManagerSettings = {
	server: Server;
	app: Application;
	config: Config;
};

export default class ServerManager
	extends EventEmitter
	implements ServiceControl<ControlOptions>
{
	readonly #server: Server;
	readonly #config: Config;
	readonly #app: Application;

	constructor({ server, app, config }: ServerManagerSettings) {
		super();
		this.#server = server;
		this.#config = config;
		this.#app = app;
	}

	get server(): Server {
		return this.#server;
	}
	get running(): boolean {
		return this.#server.listening;
	}

	start(options?: ControlOptions): this {
		const port = options?.port ?? this.#config.port;
		this.#server.listen(port);
		this.#app.set("port", port);
		this.#server.on("listening", () => this.emit("started"));

		return this;
	}

	stop(): this {
		this.#server.close(err => {
			if (err) {
				console.error(`Error closing the http server`);
				throw err;
			}
			this.emit("stopped");
			console.warn(`❌ Http server closed`);
		});

		return this;
	}

	restart(options?: ControlOptions): this {
		if (this.running) {
			this.stop();
		}

		this.start(options);

		return this;
	}
}
