import http from "http";
import type { Application } from "express";
import type { Config } from "config";
import { AutoStart, ServiceControl } from "lib";
import { runningLogger, reconnect as errorHandler } from "./handlers";

type StartOptions = Partial<{
	port: number;
}>;
export interface Server extends ServiceControl<StartOptions> {
	server: http.Server;
	start(options?: StartOptions): this;
	stop(): this;
	running: boolean;
}

export function createServer(app: Application, config: Config): Server {
	const server = http.createServer(app);
	const { port } = config;
	app.set("port", port);

	server.on("listening", runningLogger(config));

	const web: Server = {
		server,
		start(): Server {
			server.listen(port);

			return this;
		},

		stop(): Server {
			server.close(err => {
				if (err) {
					console.error(`Error closing the http server`);
					throw err;
				}

				console.warn(`❌ Http server closed`);
			});

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
