const fs = require("fs/promises"); //Cargamos el módulo File System con promesas de Node.js

//Declaramos la función de forma asíncrona con ASYNC
async function readFile() {
  // Con el try / catch indicamos que intente realizar las promesas, sino puede salta
  // al catch (recoger).
  try {
    // Con AWAIT indicamos que espere a la promesa
    const data1 = await fs.readFile("./archivo1.txt", "utf8");
    console.log("Contenido de archivo1.txt:", data1);

    const data2 = await fs.readFile("./archivo2.txt", "utf8");
    console.log("Contenido de archivo2.txt:", data2);

    const data3 = await fs.readFile("./archivo3.txt", "utf8");
    console.log("Contenido de archivo3.txt:", data3);
  } catch (error) {
    console.error("Error leyendo archivos:", error);
  }
}

readFile(); // Lanzamos la función
