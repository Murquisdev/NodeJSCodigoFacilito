// Eventos de un readableStream
// data: Cuando hay datos disponibles para ser consumidos. Se adjunta un fragmento de datos (chunk) como argumento del evento.
// end: Cuando termina el flujo
// error: Cuando hay un error durante la lectura.

// Métodos de un readableStream
// read(): Para leer datos del flujo.
// pipe(): Conecta un readableStream a un writableStream.

const fs = require("fs");
const printPixels = require("./bmpPixelPrinter");

const readableStream = fs.createReadStream("./inputImage.bmp");
// Ponemos el Stream a la escucha para saber cuando hay datos disponibles
readableStream.on("data", (chunk) => {
  //   console.log(chunk);
  printPixels(chunk);
});

readableStream.on("end", () => {
  console.log("Fin del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});
