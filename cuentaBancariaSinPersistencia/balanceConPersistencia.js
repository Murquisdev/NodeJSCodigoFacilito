const express = require("express");
const app = express();
const port = 3000;
// const fs = require("fs/promises");
const utilityFiles = require("./utilityFiles");

app.get("/balance", async (req, res) => {
  try {
    res.send(await utilityFiles.readLines());
  } catch (error) {
    res.status(500).send("Error al obtener el fichero.");
  }
});
// Indicamos que cantidad vamos a procesar en la ruta
app.get("/withdraw/:amount", async (req, res) => {
  const amount = parseInt(req.params.amount); // Obtiene el valor de "amount" desde la ruta
  if (isNaN(amount)) {
    return res.status(400).send("Cantidad inválida. Debe ser un número.");
  } else if (amount <= 0) {
    return res
      .status(400)
      .send("No se realizan operaciones con valor 0 o negativas");
  }

  try {
    await utilityFiles.operation(amount);
    res.send(await utilityFiles.readLines());
  } catch (error) {
    res.status(500).send("Error al intentar sacar dinero.");
  }
});

app.get("/deposit/:amount", async (req, res) => {
  const amount = parseInt(req.params.amount); // Obtiene el valor de "amount" desde la ruta
  if (isNaN(amount)) {
    return res.status(400).send("Cantidad inválida. Debe ser un número.");
  } else if (amount <= 0) {
    return res
      .status(400)
      .send("No se realizan operaciones con valor 0 o negativas");
  }

  try {
    await utilityFiles.operation(amount);
    res.send(await utilityFiles.readLines());
  } catch (error) {
    res.status(500).send("Error al intentar sacar dinero.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
