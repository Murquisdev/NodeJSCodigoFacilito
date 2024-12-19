// Ejecutar: node --watch index.js
// Lanza el servidor y además está escuchando los cambios que hagamos en el fichero para
// tirar abajo el servidor y levantarlo automáticamente

const express = require("express");
const app = express(); // Ya creamos el servidor

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});
//Express ya realiza los "Content-Type" automáticamente
app.get("/json", (req, res) => {
  res.json({ mensaje: "Hola mundo" });
});
// El callback es opcional
app.listen(PORT, () =>
  console.log(`🌍 Servidor corriendo en el puerto http://localhost:${PORT}`)
);
