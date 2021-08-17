import type { Server } from "http";

export interface ServiceControl<TOptions = undefined> {
	running: boolean;
	start: (options: TOptions) => this;
	stop: (options: TOptions) => this;
	restart: (options: TOptions) => this;
}

export interface ServiceControlEvents {
	on(event: "starting", listener: () => void): this;
	on(event: "started", listener: (server: Server) => void): this;
	on(event: "stopped", listener: () => void): this;
	on(event: "error", listener: (err: Error) => void): this;
	emit(event: "error", err: Error): boolean;
	emit(event: "starting", server: Server): boolean;
	emit(event: "started", server: Server): boolean;
	emit(event: "stopped"): boolean;
}
