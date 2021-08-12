import AutoStart from "../auto-start";

describe("Auto Start", () => {
	const autoStart = new AutoStart();

	it.todo("start with initial delay option");
	it.todo("exhausted Attemps is true for i runs of retries");
	it.todo("run code after Xms on the first time");
	it.todo("run code ...");

	describe("No settings", () => {
		it("initial delay is 1000ms", () => {
			expect(autoStart.delay).toBe(1000);
		});

		it.todo("attemps starts at zero");
	});

	describe("retry(callback)", () => {
		it.todo("step is 2x");
		it.todo("call one time if callback always return true");
		it.todo("receive current attemp from argument");
		it.todo(
			"run callback until reach max. attemps when callback is always false"
		);
		it.todo("calls callback the number of steps times");
		it.todo("delay callback call progressively");
		it.todo("return false when attemps finishs");
	});

	describe("Overrided settings", () => {
		describe("throws error when", () => {
			it.todo("step is negative");
			it.todo("step is zero");
		});

		it.todo("set initial delay zero if is settings is negative");
	});
});
