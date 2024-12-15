// Pasos para crear un servidor
// 1- Cargamos los módulos necesarios:
// http y url si voy a trabajar con GET
// 2 - Creo el servidor con http.createServer
// 3 - Se programa las necesidades a solucionar
// 4 - Ponemos el servidor a la escucha en un puerto

const http = require("http"); // Modulo de conexión HTTP
const fs = require("fs/promises");
const url = require("url"); // Módulo que permite analizar, construir y manipular URLs.

// request: Objeto de solicitud (información de la petición del cliente)
// response: Objeto de respuesta (para enviar datos al cliente)
const server = http.createServer(async (request, response) => {
  const queryObject = url.parse(request.url, true).query; // El segundo argumento 'true' parsea la query string y el .query lo pasa a un Objeto
  const fileName = queryObject.file;

  if (fileName) {
    try {
      const data = await fs.readFile(fileName, "utf-8");
      response.writeHead(200, { "Content-Type": "text/plain" }); // Encabezados de la respuesta
      response.write(data); // Cuerpo de la respuesta
      response.end(); // Indica el final de la respuesta
    } catch (error) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("File not found");
      response.end();
    }
  } else {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.write("Bad request: please provide a file name");
    response.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Al usar un método GET, escribimos en el navegador
// http://localhost:3000/?file=archivo1.txt y así le pasamos la query para que busque el archivo 1
