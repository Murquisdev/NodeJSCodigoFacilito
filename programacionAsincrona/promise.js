const fs = require("fs");

// Creamos la promesa
const promise = () =>
  // La promesa ejecuta una resolución o un rechazo
  new Promise((resolve, reject) => {
    fs.readFile("./archivo1.txt", "utf-8", (error, data) => {
      error ? reject(error) : resolve(data); // Si error, devuelvo el error, sino la resolución
    });
  });

promise()
  .then((data) => console.log("Contenido del archivo:", data))
  .catch((error) => console.log("Error leyendo el archivo:", error));
