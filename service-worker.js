const CACHE = "POETRY_APP";

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		fetch(fetchEvent.request)
	);
});