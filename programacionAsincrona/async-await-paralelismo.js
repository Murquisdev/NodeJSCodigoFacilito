const fs = require("fs/promises");

async function readFilesInParallel() {
  try {
    // Array con las rutas de los archivos
    const filePaths = ["./archivo1.txt", "./archivo2.txt", "./archivo3.txt"];

    // Creamos un array de promesas para leer cada archivo
    const readPromises = filePaths.map((filePath) => {
      return fs.readFile(filePath, "utf8");
    });
    console.log(readPromises);

    // Esperamos a que todas las promesas se resuelvan con Promise.ALL
    // Toma un array de promesas y las devuelve todas o cuando una es rechazada
    const data = await Promise.all(readPromises);
    console.log(data);

    // Procesamos los resultados
    data.forEach((content, index) => {
      console.log(`Contenido del archivo ${index + 1}:`, content);
    });
  } catch (error) {
    console.error("Error leyendo archivos:", error);
  }
}

readFilesInParallel();
