import type { Server } from "http";
import { ServiceControl } from "lib";
import type { Config } from "config";

export interface ServerManager extends ServiceControl {
	server: Server;
	running: boolean;
	start(): this;
	stop(): this;
	restart(): this;
}

export function createServerManager(
	server: Server,
	{ port }: Config
): ServerManager {
	return {
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

		restart(): ServerManager {
			if (this.running) {
				this.stop();
			}

			this.start();

			return this;
		},

		get running(): boolean {
			return server.listening;
		},
	};
}
