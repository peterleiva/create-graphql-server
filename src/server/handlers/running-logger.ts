import type { Config } from "config";
import { sprintf } from "sprintf-js";
import address from "address";
import chalk from "chalk";
import styleAddress from "./style-address";
import type ServerControl from "../server-control";

/**
 * Inform to the user that the server is running. print the message to shell
 *
 * @param config
 * @returns
 */
export default function runningLogger(
	service: ServerControl,
	config: Config
): () => void {
	return () => {
		const port = service.port;

		if (!port) {
			console.error(`Server is not running`);
			return;
		}

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
