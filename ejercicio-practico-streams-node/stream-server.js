const http = require("http");
const fs = require("fs");
const sharp = require("sharp");

const server = http.createServer((req, res) => {
  // Al usar streams, carga una sola parte en memoría de la imagen
  const inputImageStream = fs.createReadStream("./inputImage.png");

  const grayscaleTransform = sharp().grayscale();

  // Con el método pipe puedo escribir y leer a la vez
  inputImageStream.pipe(grayscaleTransform).pipe(res);
});

server.listen(3001);
