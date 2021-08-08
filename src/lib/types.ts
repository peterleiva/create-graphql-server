export interface ServiceControl {
	start: (...args: unknown[]) => this;
	stop: () => this;
	running: boolean;
}
