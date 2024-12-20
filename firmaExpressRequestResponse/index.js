// Requiere instalar la librería express y cookie-parser (para leer cookies)
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 3000;

// Middleware
// Cuando recibimos un json, lo puede interpretar
app.use(express.json());
// Cuando recibimos cookies, las puede interpretar
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/json", (req, res) => {
  res.json({ mensaje: "Hola mundo" });
});

// Los : indica que es como si fuera una variable (los parámetros)
app.post("/request/:id", (req, res) => {
  const requestObject = {
    body: req.body,
    cookies: req.cookies,
    hostname: req.hostname,
    ip: req.ip,
    method: req.method,
    params: req.params,
    path: req.path,
    protocol: req.protocol,
    query: req.query,
    secure: req.secure,
    contentType: req.get("Content-Type"),
    isJson: req.is("json"),
  };

  res.json(requestObject);
});
// Creamos la petición con curl
// curl --silent --request POST --header "Content-Type: application/json" --data '{"test": "data"}' --cookie "myCookie=hello" http://localhost:3000/request/42?search=meaning+of+life

app.get("/response", (req, res) => {
  res.cookie("myCookie", "Hola mundo");
  res.set("X-Custom-Header", "GuillermoHeader");
  res.status(200).send("Mira los headers y las cookies!");
});
// curl --silent --verbose http://localhost:3000/response

app.listen(PORT, () =>
  console.log(`🌍 Servidor corriendo en el puerto http://localhost:${PORT}`)
);
