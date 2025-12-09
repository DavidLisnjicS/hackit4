const NEXT_PAGE_URL = "/go"; // Weiterleitungs-Route, echte URL ist im Backend versteckt

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .then((reg) => {
            console.log("Service Worker registriert:", reg.scope);
        })
        .catch((err) => {
            console.warn("Service Worker Registrierung fehlgeschlagen:", err);
        });
} else {
    console.warn("Service Worker werden von diesem Browser nicht unterstützt.");
}

async function getSecretPassword() {
    const CACHE_NAME = "hackit-level-f-v2";

    if (!("caches" in window)) {
        throw new Error("Cache-API wird von diesem Browser nicht unterstützt.");
    }

    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match("hint.json");

    if (!response) {
        throw new Error("hint.json wurde im Cache nicht gefunden.");
    }

    const data = await response.json();

    if (!data.password) {
        throw new Error("In hint.json wurde kein 'password'-Feld gefunden.");
    }

    return atob(data.password);
}

const form = document.getElementById("password-form");
const input = document.getElementById("password-input");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const SECRET_PASSWORD = await getSecretPassword();

        if (input.value === SECRET_PASSWORD) {
            message.textContent = "Korrekt! Du hast Level F geschafft.\nWeiter zum nächsten Level …";
            message.className = "success";

            setTimeout(() => {
                window.location.href = NEXT_PAGE_URL; // -> /go -> Backend redirect
            }, 2000);
        } else {
            message.textContent =
                "Falsches Passwort. Tipp: Schau dir DevTools-Tab 'Application/Storage' genauer an.";
            message.className = "error";
        }
    } catch (err) {
        console.error(err);
        message.textContent =
            "Interner Fehler beim Laden des Passworts. Sieh dir mal die Konsole an ";
        message.className = "error";
    }

    input.value = "";
});
