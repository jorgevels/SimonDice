self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("video-store").then(function(cache) {
      return cache.addAll([
        "/SimonDice-/",
        "/SimonDice-/index.html",
        "/SimonDice-/js/main.js",
        "/SimonDice-/index.js",
        "/SimonDice-/css/style.css"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
