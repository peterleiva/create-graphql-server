import http from "http";
import chalk from "chalk";
import { sprintf } from "sprintf-js";
import address from "address";
import type { Application } from "express";
import type { Config } from "config";
import { Reconnect } from "./reconnect";
import styleAddress from "./style-address";

export interface HttpServer {
	start: (port?: number) => void;
	stop: () => void;
	isRunning: () => boolean;
}

export function createServer(app: Application, config: Config): HttpServer {
	const server = http.createServer(app);
	const port: number = config.port;
	app.set("port", port);

	server.on("listening", onListening(config));

	const web: HttpServer = {
		start(): void {
			server.listen(port);
		},

		stop(): void {
			server.close(err => {
				if (err) {
					console.error(`Error closing the http server`);
					throw err;
				}

				console.warn(`❌ Http server closed`);
			});
		},

		isRunning(): boolean {
			return server.listening;
		},
	};

	const reconnect = new Reconnect(web);
	server.on("error", errorHandler(reconnect));

	return web;
}

function onListening(config: Config): () => void {
	const port = config.port;

	return () => {
		console.info(
			sprintf(
				"%5s %s %s",
				"🚀",
				`Server is ${chalk.green("running").toLowerCase()}`,
				`on 📦 ${chalk.magenta(config.env())} environment`
			)
		);

		if (config.env("dev")) {
			console.info(
				sprintf(
					"%5s %-18s%20s",
					"🔈",
					"Listening on",
					styleAddress({ hostname: "localhost", port })
				)
			);
			console.info(
				sprintf(
					"%5s  %-18s%20s",
					"🕸",
					"On your network",
					styleAddress({ hostname: address.ip(), port })
				)
			);
		}
	};
}

function errorHandler(reconnect: Reconnect) {
	return (err: NodeJS.ErrnoException) => {
		if (err.code === "EADDRINUSE") {
			if (!reconnect.exhaustedAttempts) {
				const delay = reconnect.delay;
				console.error(`Address in use. Retrying in ${delay / 1_000}s`);
				reconnect.retry();
			} else {
				const retries = reconnect.retries;

				console.error(
					chalk.red(`Max retries (${retries}) reached. Stopping the server.`)
				);
				process.exit(1);
			}
		} else {
			console.error("Error with http server");
			throw err;
		}
	};
}
