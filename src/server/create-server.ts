import { createServer, RequestListener } from "http";
import type { Config } from "config";
import { runningLogger, errorListener } from "./handlers";
import ServerControl from "./server-control";

export function createHttpServer(
	app: RequestListener,
	config: Config
): ServerControl {
	const server = createServer(app);
	const httpController = new ServerControl(server);

	httpController.on("started", runningLogger(httpController, config));
	httpController.on("error", errorListener(httpController));

	return httpController;
}
