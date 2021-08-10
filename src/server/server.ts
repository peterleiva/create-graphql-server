import http from "http";
import type { Application } from "express";
import type { Config } from "config";
import { runningLogger, reconnect as errorHandler } from "./handlers";
import { createServerManager, ServerManager } from "./server-manager";

export function createServer(app: Application, config: Config): ServerManager {
	const server = http.createServer(app);
	const { port } = config;
	app.set("port", port);

	const manager = createServerManager(server, config);

	server.on("listening", runningLogger(config));
	server.on("error", errorHandler(manager));

	return manager;
}
