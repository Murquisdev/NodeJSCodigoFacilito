// 1 - Importamos el módulo express
// 2 -  Creamos el servidor
// 3 - Guardamos el puerto
// Creamos el método que recibe la petición
// Creamo el método que lanza el servidor
const express = require("express");
const app = express();

const PORT = 3000;

const persona = {
  nombre: "Marcos",
  edad: 39,
  Nacionalidad: "Española",
};

app.get("/", (req, res) => {
  res.json(persona);
});

app.listen(PORT, () =>
  console.log(`🕸️ Servidor a la escucha en http://localhost:${PORT}`)
);
