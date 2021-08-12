import http from "http";
import type { Application } from "express";
import type { Config } from "config";
import { runningLogger, errorListener } from "./handlers";
import { createServerManager, ServerManager } from "./server-manager";

export function createServer(app: Application, config: Config): ServerManager {
	const server = http.createServer(app);
	const manager = createServerManager(server, app, config);

	server.on("listening", runningLogger(manager, config));
	server.on("error", errorListener(manager));

	return manager;
}
