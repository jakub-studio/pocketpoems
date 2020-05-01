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
	"img/o-children-1.jpg",
	"img/o-marbles-1.jpg",
	"img/o-teddys-1.jpg",
	"img/o-beach-1.jpg",
	"img/o-dollies-1.jpg",
	"app.js"
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
		cacheThenNetwork(fetchEvent)
	);
});

async function cacheThenNetwork(event) {
	const cache = await caches.open(CACHE);

	const cachedResponse = await cache.match(event.request);

	if (cachedResponse) {
		swConsole.log("Serving From Cache: " + event.request.url);
		return cachedResponse;
	}

	const networkResponse = await fetch(event.request);

	swConsole.log("Calling network: " + event.request.url);

	return networkResponse;
}