import http from "http";
import type { Application } from "express";
import type { Config } from "config";
import { AutoStart, ServiceControl } from "lib";
import { runningLogger, reconnect as errorHandler } from "./handlers";

type ServerOptions = Partial<{
	port: number;
}>;

export interface ServerManager extends ServiceControl<ServerOptions> {
	server: http.Server;
	start(options?: ServerOptions): this;
	stop(): this;
	restart(options?: ServerOptions): this;
	running: boolean;
}

export function createServer(app: Application, config: Config): ServerManager {
	const server = http.createServer(app);
	const { port } = config;
	app.set("port", port);

	server.on("listening", runningLogger(config));

	const web: ServerManager = {
		server,
		start(): ServerManager {
			server.listen(port);

			return this;
		},

		stop(): ServerManager {
			server.close(err => {
				if (err) {
					console.error(`Error closing the http server`);
					throw err;
				}

				console.warn(`❌ Http server closed`);
			});

			return this;
		},

		restart(options: ServerOptions): ServerManager {
			if (this.running) {
				this.stop();
			}

			this.start(options);

			return this;
		},

		get running(): boolean {
			return server.listening;
		},
	};

	const reconnect = new AutoStart(web);
	server.on("error", errorHandler(reconnect));

	return web;
}
