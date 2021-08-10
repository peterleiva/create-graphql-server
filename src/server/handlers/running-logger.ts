import type { Config } from "config";
import { sprintf } from "sprintf-js";
import address from "address";
import chalk from "chalk";
import styleAddress from "./style-address";

/**
 * Inform to the user that the server is running. print the message to shell
 *
 * @param config
 * @returns
 */
export default function runningLogger(config: Config): () => void {
	const { port } = config;

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
