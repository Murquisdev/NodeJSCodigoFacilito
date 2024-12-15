const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(async (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", async () => {
      try {
        // Analizar el cuerpo (body). Asumiendo que es JSON. Si fueran datos de formulario, usa una librería como 'querystring'
        const { file } = JSON.parse(body); // Espera recibir algo como {"file": "miArchivo.txt"}

        if (!file) {
          response.writeHead(400, { "Content-Type": "text/plain" });
          response.end(
            "Petición incorrecta: Por favor proporciona un nombre de archivo en el cuerpo JSON."
          );
          return;
        }

        const data = await fs.readFile(file, "utf-8");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(data);
      } catch (error) {
        if (error.code === "ENOENT") {
          // Comprobar si es un error de "archivo no encontrado"
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("Archivo no encontrado");
        } else if (error instanceof SyntaxError) {
          // Comprobar errores al analizar JSON
          response.writeHead(400, { "Content-Type": "text/plain" });
          response.end(
            "Petición incorrecta: JSON inválido en el cuerpo de la petición."
          );
        } else {
          console.error("Error al leer el archivo:", error); // Registrar el error para depuración
          response.writeHead(500, { "Content-Type": "text/plain" }); // Error interno del servidor
          response.end("Error interno del servidor");
        }
      }
    });
  } else {
    response.writeHead(405, { "Content-Type": "text/plain" }); // Método no permitido
    response.end("Método no permitido. Usa POST.");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// ejecutamos el archivo con node server-post.js
// Enviamos una petición con el método post utilizando la consola mediante el comando CURL
// curl -X POST -H "Content-Type: application/json" -d '{"file": "archivo1.txt"}' http://localhost:3000
// -X POST: Índica el método a utlizar
// -H "Content-Type: application/json": Indicamos en el encabezado que el cuerpo es un JSON
// -d '{"file": "archivo1.txt"}': Con -d (o --data) indicamos que vamos a enviar datos en el cuerpo de la solicitud
// y '{"file": "archivo1.txt"}' son los datos a enviar.
