const fs = require("fs");

const readableStream = fs.createReadStream("./Quijote.txt");

let countChunk = 0;
readableStream.on("data", (chunk) => {
  console.log(chunk.toString());
  countChunk++;
});

readableStream.on("end", () => {
  console.log("Fin del libro");
  console.log("Chunks contandos: " + countChunk);
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});
