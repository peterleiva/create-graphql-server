import { createHttpServer, ServerControl } from "server";
import app from "app";
import config from "config";

export function main(): void {
	const controller: ServerControl = createHttpServer(app, config);
	controller.on("started", () => app.set("port", controller.port));
	controller.start({ port: config.port });
}

main();
