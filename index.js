if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/SimonDice/sw.js").then(function() {
    console.log("Service Worker Registered");
  });
}

// Código para manejar la solicitud de instalación en el escritorio

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", e => {
  // Evita que Chrome 67 y versiones anteriores muestren automáticamente el aviso
  e.preventDefault();
  // Guarda el evento para que pueda activarse más tarde.
  deferredPrompt = e;
  // Actualizar la interfaz de usuario para notificar al usuario que puede agregar a la pantalla de inicio
  addBtn.style.display = "block";

  addBtn.addEventListener("click", e => {
    // Oculta nuestra interfaz de usuario que muestra nuestro botón A2HS.
    addBtn.style.display = "none";
    // Mostrar el aviso
    deferredPrompt.prompt();
    // Espere a que el usuario responda a la pregunta
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
