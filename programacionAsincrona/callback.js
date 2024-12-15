const fs = require("fs"); //cargamos el módulo File System de Node.js

function callback(error, data) {
  if (error) {
    console.log("Error leyendo el archivo", error);
  } else {
    console.log("Contenido del archivo:", data);
  }
}

// readFile se comporta de forma asíncrona
// Muestra el contenido del archivo de forma asíncrona, no tiene porque salir en orden
fs.readFile("./archivo1.txt", "utf-8", callback);
fs.readFile("./archivo2.txt", "utf-8", callback);
fs.readFile("./archivo3.txt", "utf-8", callback);
