export interface ServiceControl<TOptions = undefined> {
	start: (options?: TOptions) => this;
	stop: (options?: TOptions) => this;
	restart: (options?: TOptions) => this;
	running: boolean;
}
