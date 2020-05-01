type LogFn = (...args: any[]) => void;

class CustomConsole {
	private _d: {
		name: string
		color: string
	}
	public log: LogFn
	public warn: LogFn
	public error: LogFn
	constructor(name: string, color: string) {
		this._d = {
			name,
			color
		}

		this.log = console.log.bind(console, `%c[${this._d.name}]`, `color: ${this._d.color}`);
		this.warn = console.warn.bind(console, `[${this._d.name}]`);
		this.error = console.error.bind(console, `[${this._d.name}]`);
	}
	extend (name: string) {
		return new CustomConsole(
			this._d.name + ":" + name,
			this._d.color
		)
	}
}

export default CustomConsole;