import dotenv from "dotenv";
import { env } from "node.env-inspector";

const result = dotenv.config();
if (result.error && !env("production")) {
	console.error("🚨 Failed to parser /.env file");
}

const config = {
	port: +(process.env.PORT ?? "3000"),
	logLevel: process.env.LOG_LEVEL ?? "info",
	databaseURL: process.env.DATABASE_URL,
	env,
};

export type Config = typeof config;

export default config;
