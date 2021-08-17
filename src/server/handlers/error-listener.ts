import chalk from "chalk";
import type ServerControl from "../server-control";
import type { onError } from "./types";

const ALTERNATIVE_PORTS = [3000, 5000, 7000, 8888, 9000, 0];

export default function errorListener(service: ServerControl): onError {
	const nextPorts = [...ALTERNATIVE_PORTS];

	return (err: NodeJS.ErrnoException): void => {
		if (err.code === "EADDRINUSE") {
			const port = nextPorts.shift();

			if (port === undefined) {
				console.error(
					chalk.red(
						"All alternative ports have been tried. Please start the server " +
							"using a unused port"
					)
				);
				process.exit(1);
			}

			console.warn(
				`Port is already in use. Trying port ${chalk.blue(port)}...`
			);
			service.restart({ port });
		} else {
			console.error("Error with http server");
			throw err;
		}
	};
}
