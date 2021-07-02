import dotenv from "dotenv";
import { env } from "node.env-inspector";

const result = dotenv.config();
if (result.error && !env("production")) {
	console.info("🚨 Failed to parser /.env file");
}

export type Config = {
	port: number;
	logLevel: string;
	databaseURL: string;
	env: typeof env;
};

export default {
	port: parseInt(process.env.PORT ?? "7000", 10),
	logLevel: process.env.LOG_LEVEL ?? "info",
	databaseURL: process.env.DATABASE_URL,
	env,
} as Config;
