const fs = require("fs/promises");
const file = "balance.txt";
const utf8 = "utf-8";

async function readFile() {
  try {
    const data = await fs.readFile(file, utf8);
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      // Error "NO ENTRY" (archivo no encontrad)
      console.log(`Archivo ${file} no encontrado. Creando archivo...`);
      await fs.writeFile(file, '{"Balance": 5000}\nSaldo inicial: 5000', utf8); // Creamos el archivo.
      console.log(`Archivo ${file} creado`);
      return readFile(); // Retornamos el valor de la llamada recursiva
    } else {
      console.error(`Error al leer el archivo: ${file}`, error);
      throw error;
    }
  }
}
async function readLines() {
  try {
    const data = await fs.readFile(file, utf8);
    const lines = data.split("\n"); // Creo un array de líneas
    return lines;
  } catch (error) {
    if (error.code === "ENOENT") {
      // Error "NO ENTRY" (archivo no encontrad)
      console.log(`Archivo ${file} no encontrado. Creando archivo...`);
      await fs.writeFile(file, '{"Balance": 5000}\nSaldo inicial: 5000', utf8); // Creamos el archivo.
      console.log(`Archivo ${file} creado`);
      return readFirstLine(); // Retornamos el valor de la llamada recursiva
    } else {
      console.error(`Error al leer el archivo: ${file}`, error);
      throw error;
    }
  }
}

async function operation(num) {
  const lines = await readLines(); // Recupero las líneas
  const jsonData = JSON.parse(lines[0]); // La primera es la que tiene el Balance en formato JSON
  jsonData.Balance += num; // Modifico el balance
  lines[0] = JSON.stringify(jsonData); // Me guardo la línea con formato String para poder escribir en el fichero
  if (num > 0)
    lines.push(`Ingresado: ${num}`); // Agrego el tipo de operación al arrayy
  else lines.push(`Retirado: ${num}`);
  newData = lines.join("\n"); // Junto el array en un string para poder escribir en el fichero
  await fs.writeFile(file, newData, utf8);
}

module.exports = {
  readFile,
  readLines,
  operation,
};
