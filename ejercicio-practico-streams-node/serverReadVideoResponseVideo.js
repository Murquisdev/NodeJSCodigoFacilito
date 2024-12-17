// 1 - Cargamos los módulos
// 2 - Creamos el servidor
// 3 - Creamos el stream
// 4 - Creamos la respuesta de la cabecera
// 5 - Creamos la respuesta que envía el vídeo
// 6 - Manejor de errores
// 7 - Lanzamos el servidor

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  try {
    const video = fs.createReadStream("./video.mp4");
    res.writeHead(200, { "Content-Type": "video/mp4" });
    video.pipe(res); // Transfiere el video y cierra la respuesta automáticamente
    video.on("error", (error) => {
      // Manejo de error en el stream
      console.error("Error reading video:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal server error");
    });
  } catch (error) {
    console.error("Error: ", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
});

server.listen(3000, () => console.log("Server listening on port 3000"));
