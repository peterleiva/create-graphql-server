import type { Server } from "http";
import type { Config } from "config";
import type { Application } from "express";
import { ServiceControl } from "lib";

type ControlOptions = {
	port: number;
};

export interface ServerManager extends ServiceControl<ControlOptions> {
	server: Server;
	running: boolean;
	start(options?: ControlOptions): this;
	stop(): this;
	restart(options?: ControlOptions): this;
}

export function createServerManager(
	server: Server,
	app: Application,
	config: Config
): ServerManager {
	return {
		server,
		start(options?: ControlOptions): ServerManager {
			const port = options?.port ?? config.port;
			server.listen(port);
			app.set("port", port);

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

		restart(options?: ControlOptions): ServerManager {
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
}
