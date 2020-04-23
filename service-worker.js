const CACHE = "POETRY_APP";
const APP_NAME = "pocketpoems";
const PREFIX = "pwa-res";

const getConsole = (name, color) => {
	const newConsole = Object.create(console);
	newConsole.log = console.log.bind(console, `%c[${name}]`, `color: ${color}`);
	newConsole.warn = console.warn.bind(console, `[${name}]`);
	newConsole.error = console.error.bind(console, `[${name}]`);
	newConsole.time = (label) => console.time(`[${name}] ${label}`);
	newConsole.timeEnd = (label) => console.timeEnd(`[${name}] ${label}`);

	return newConsole;
};

const swConsole = getConsole("ServiceWorker", "#0077b8");

const fileCache = [
	"img/children-1.jpg",
	"img/children-2.jpg",
	"img/children-3.jpg",
	"img/dollies-1.jpg",
	"img/dollies-2.jpg",
	"img/marbles-1.jpg",
	"img/ocean-1.jpg",
	"img/teddy-1.jpg"
].map(file => `/${APP_NAME}/${PREFIX}/${file}`);

self.addEventListener("install", event => {
	swConsole.log(`Installed at ${new Date().toUTCString()}`);
	event.waitUntil(
		caches.open(CACHE)
			.then(cache => {
				swConsole.log("Cache initated and caching all files", fileCache);
				return cache.addAll(fileCache);
			})
	);
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		fetch(fetchEvent.request)
	);
});