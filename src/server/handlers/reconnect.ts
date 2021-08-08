import chalk from "chalk";
import type { AutoStart } from "lib";

export default function errorHandler(reconnect: AutoStart) {
	return (err: NodeJS.ErrnoException): void => {
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
