import { createServer } from "server";
import app from "app";
import config from "config";

export default function bootstrap(): void {
	const www = createServer(app, config);
	www.start();
}
