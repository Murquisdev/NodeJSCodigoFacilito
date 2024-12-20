// 1 - Importar express
// 2 - Crear el servidor
// 3 - Guardar el puerto
// 4 - Crear el endpoint
// 5 - Escuchar el servidor
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/response", (req, res) => {
  res.send(console.log(res));
});

app.get("/request", (req, res) => {
  res.send(console.log(req));
});

app.listen(PORT, () =>
  console.log(`🕸️ Servidor corriendo en el puerto http://localhost:${PORT}`)
);
