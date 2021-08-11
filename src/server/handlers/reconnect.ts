import chalk from "chalk";
import { AutoStart, ServiceControl } from "lib";
import type { onError } from "./types";

export default function errorHandler(service: ServiceControl): onError {
	const reconnect = new AutoStart();

	return (err: NodeJS.ErrnoException): void => {
		if (err.code === "EADDRINUSE") {
			if (!reconnect.exhaustedAttempts) {
				const delay = reconnect.delay;
				console.error(`Address in use. Retrying in ${delay / 1_000}s`);
				reconnect.retry(() => service.restart());
			} else {
				console.error(
					chalk.red(
						`Max retries (${reconnect.attempts}) reached. Stopping the server.`
					)
				);
				process.exit(1);
			}
		} else {
			console.error("Error with http server");
			throw err;
		}
	};
}
