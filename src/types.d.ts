declare module '*.css' {
	const content: {[className: string]: string};
	export = content;
}

declare module "css-scroll-snap-polyfill" {
	function polyfill(): void;
	export default polyfill;
}

declare interface NodeRequire {
	context: (folder: string, subdirs: boolean, regex: RegExp) => any;
}

declare namespace App {
	export interface Poem {
		name: string,
		note: null | string,
		author: string,
		coverImage: string,
		source: {
			origin: string,
			year: number,
			publisher: string
		},
		content: string[]
	}
}