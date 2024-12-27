const pool = require("./lib/connect");
const express = require("express");

const app = express();
const port = 3000;

async function getTweets() {
  try {
    // pool.queryy devuelve un array con dos elementos, filas y metadatos (nombre y tipo de columna en la tabla)
    console.log(await pool.query("SELECT * FROM tweets"));
    const [rows] = await pool.query("SELECT * FROM tweets"); // Usa pool.query y destructuring
    return rows;
  } catch (error) {
    console.error("Error al obtener tweets:", error); // Loggea el error para depuración
    throw error; // Re-lanza el error para que lo maneje el endpoint
  }
}

// Endpoint para obtener los tweets
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tweets" });
  }
});

app.listen(port, () =>
  console.log(`🌍 Server running at http://localhost:${port}`)
);
