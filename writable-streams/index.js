// Eventos de un writableStream
// drain: Indica cuando el búfer interno está vacío y listo para recibir más datos
// finish: Se invoca cuando se llama al método end() y todos los datos han sido escritos
// error: Cuando hay un error durante la escritura.

// Métodos de un writableStream
// write(): Se utiliza para escribir datos en el flujo. Acepta un fragmento de datos (chunk) como argumento y devuelte true/false según si el buffer está lleno o no.
// end(): Señala el final de la escritura, aunque puede recibir opcionalmente un último chunk antes de cerrar el flujo.

const fs = require("fs");
const printPixels = require("./bmpPixelPrinter");

const readableStream = fs.createReadStream("./inputImage.bmp");
const writableStream = fs.createWriteStream("./outputImage.bmp");

readableStream.on("data", (chunk) => {
  // console.log(chunk);
  printPixels(chunk);
  writableStream.write(chunk);
});

readableStream.on("end", () => {
  console.log("Fin de lectura del archivo");
  // Hay que indicar el final del writableStream para que salte el evento finish
  writableStream.end();
});

writableStream.on("finish", () => {
  console.log("Fin de escritura del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});

writableStream.on("error", () => {
  console.log("Error en la escritura");
});
