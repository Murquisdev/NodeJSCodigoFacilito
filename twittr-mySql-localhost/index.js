const express = require("express");
const tweetsRouter = require("./routes/tweetsRouter");

const app = express();
const port = 3000;

// Middleware que interpreta JSONs, tiene que ir primero para que los interprete
app.use(express.json());
// Hay que definirlo como un router global, no como get, porque el método lo definimos en tweetsRouter
app.use("/tweets", tweetsRouter);
app.listen(port, () =>
  console.log(`🌍 Server running at http://localhost:${port}`)
);
