const fs = require("fs"); //cargamos el módulo File System de Node.js

// Si necesitamos esperar a leer los 3 archivos para poder seguir con una operación
// Se forma el denominado callback-hell, dificil de leer y saber que parte se está
// ejecutando.

fs.readFile("./archivo1.txt", "utf8", (error1, data1) => {
  if (error1) {
    console.error("Error leyendo archivo1.txt:", error1);
  } else {
    console.log("Contenido de archivo1.txt:", data1);

    fs.readFile("./archivo2.txt", "utf8", (error2, data2) => {
      if (error2) {
        console.error("Error leyendo archivo2.txt:", error2);
      } else {
        console.log("Contenido de archivo2.txt:", data2);

        fs.readFile("./archivo3.txt", "utf8", (error3, data3) => {
          if (error3) {
            console.error("Error leyendo archivo3.txt:", error3);
          } else {
            console.log("Contenido de archivo3.txt:", data3);
          }
        });
      }
    });
  }
});

// Comprueba el archivo1, si no hay error el 2 y si no hay error el 3.
