export interface ServiceControl<T = undefined, R = undefined> {
	start: (options?: T) => this;
	stop: (options?: R) => this;
	running: boolean;
}
