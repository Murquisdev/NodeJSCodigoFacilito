const fs = require("fs");

const readableStream = fs.createReadStream("./Quijote.txt");

readableStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

readableStream.on("end", () => {
  console.log("Fin del libro");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});
