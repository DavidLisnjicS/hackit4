const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien (dein bisheriges Frontend)
app.use(express.static(path.join(__dirname, "public")));

// Diese Route wird vom Frontend nach erfolgreichem Level aufgerufen
app.get("/go", (req, res) => {
    // 👉 HIER steht die "geheime" Weiterleitungs-URL NUR im Backend
    res.redirect("https://akits-hackit.onrender.com/KvsxGbi4by");
    // Wenn du eine andere Ziel-URL willst, ändere einfach die Zeile oben.
});

// Fallback: alle anderen Routen bekommen index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server läuft auf Port", PORT);
});
