import { URL } from "url";
import chalk from "chalk";

export default function styleAddress({
	protocol = "http",
	hostname,
	port = 80,
}: {
	protocol?: string;
	hostname: string;
	port: number;
}): string {
	const address = new URL(`${protocol}://${hostname}:${port}`);
	return chalk.underline.blue(address);
}
