const VERSION = "v1";

// Se llama cuando el navegador instale el sw
self.addEventListener("install", event => {
  // El precache recibe una lista de recursos que querramoes que mantenfa en cache
  event.waitUntil(precache());
});

// Cada vez que ocurra  una pericion quiero que el sw haga algo
self.addEventListener("fetch", event => {
  // Extrar la peticion
  const request = event.request;
  // get solo traer los get
  // si el metodo  del request no es un get no vamos hacer nada
  // significa que el request va seguir en internet
  if (request.method !== "GET") {
    return;
  }

  // buscar en cache
  event.respondWith(cachedResponse(request));

  // actualizar el cache
  event.waitUntil(updateCache(request));
});

//Nos da una instancia de un cache que le va pertenecer a la version uno y regresa una promesa
async function precache() {
  const cache = await caches.open(VERSION);

  // Añadimos una lista de todos nuestros recursos del proyecto
  return cache.addAll([
    // Es muy importante ya que las paginas tambien las solicitamos como / debemos capturar esta request
  ]);
}

// Buscando recursos en el cache
async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  // Le preguntamos al cache, ya tienes una copia que le corresponde al request
  // si no tiene nada va el request en internet
  const response = await cache.match(request);
  // Retorna el cache encontrado o va al request de internet
  return response || fetch(request);
}

// Buscando una copia actualizada de todos los archivos de la aplicacion
async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
