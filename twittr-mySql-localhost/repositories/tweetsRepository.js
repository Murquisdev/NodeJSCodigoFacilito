const pool = require("../lib/connect");

module.exports = {
  getTweets,
  createTweet,
  getTweet,
  deleteTweet,
  updateTweet,
};

async function getTweets() {
  try {
    // pool.queryy devuelve un array con dos elementos, filas y metadatos (nombre y tipo de columna en la tabla)
    const [rows] = await pool.query("SELECT * FROM tweets"); // Usa pool.query y destructuring
    return rows;
  } catch (error) {
    console.error("Error al obtener tweets:", error); // Loggea el error para depuración
    throw error; // Re-lanza el error para que lo maneje el endpoint
  }
}

async function createTweet(tweet) {
  try {
    // El signo de interrogación ? es un marcador de posición (placeholder) para los valores que se van a insertar. Esto es importante para prevenir inyecciones SQL.
    const query = "INSERT INTO tweets SET ?";
    // Pasamos 'tweet' como segundo argumento que es el objeto que tienes los datos a insertar, contenido, userID, etc. Y la librería mysql2 ya se encarga de modificar el ? por el objeto tweet y prevenir inyecciones SQL
    const [result] = await pool.query(query, tweet);
    // console.log(result);
    return { tweetId: result.insertId, ...tweet }; // Devolvemos el ID insertado y el tweet
  } catch (error) {
    console.error("Error al crear el tweet", error);
    throw error;
  }
}
// curl -X POST -H "Content-Type: application/json" -d '{"content": "Hola primer tweet insertado", "userId": 1}' http://localhost:3000/tweets
// con httpie (hay aplicación para escritorio)
// http POST localhost:3000/tweets content='Hola segundo tweet insertado' userId=1

async function getTweet(tweetId) {
  try {
    const query = "SELECT * FROM tweets WHERE tweetId = ?";
    // Validar si tweetId es null, undefined o vacío antes de parsear
    const tweetIdNumber = checkTweetId(tweetId);
    // [tweetId]: Se encierra tweetId dentro de un array. Esto asegura que mysql2 escape correctamente el valor y prevenga la inyección SQL.
    const [result] = await pool.query(query, [tweetIdNumber]);

    if (!result || result.length === 0) {
      const error = new Error(
        `No se encontró ningún tweet con el ID '${tweetIdNumber}'.`
      );
      error.statusCode = 404; // Código de estado 404 Not Found
      console.error(error.message);
      throw error;
    }

    return result[0];
  } catch (error) {
    console.error("Error al obtener el tweet", error);
    throw error;
  }
}

async function deleteTweet(tweetId) {
  try {
    const query = "DELETE FROM tweets WHERE tweetId = ?"; // Corrección: quitar el *
    const tweetIdNumber = await checkTweetId(tweetId);
    const [result] = await pool.query(query, [tweetIdNumber]);

    // Acceder a la propiedad affectedRows para obtener el número de filas afectadas
    const affectedRows = result.affectedRows;
    if (affectedRows === 0) {
      const error = new Error(
        `No se encontró ningún tweet con el ID '${tweetIdNumber}'.`
      );
      error.statusCode = 404;
      console.error(error.message);
      throw error;
    }
    console.log(`Se eliminaron ${affectedRows} filas.`);

    return affectedRows; // Devolver el número de filas afectadas
  } catch (error) {
    console.error("Error al eliminar el tweet:", error);
    throw error;
  }
}
async function updateTweet(tweetId, content) {
  try {
    const query = "UPDATE tweets SET content = ? WHERE tweetId = ?";
    const tweetIdNumber = await checkTweetId(tweetId);

    const [result] = await pool.query(query, [content, tweetIdNumber]);

    const affectedRows = result.affectedRows;
    if (affectedRows === 0) {
      const error = new Error(
        `No se encontró ningún tweet con el ID '${tweetIdNumber}'.`
      );
      error.statusCode = 404;
      console.error(error.message);
      throw error;
    }
    console.log(`Se actualizaron ${affectedRows} filas.`);

    const [updatedTweet] = await pool.query(
      "SELECT * FROM tweets WHERE tweetId = ?",
      [tweetIdNumber]
    );
    return updatedTweet[0]; //Devolvemos el tweet actualizado
  } catch (error) {
    console.error("Error al modificar el tweet:", error);
    throw error;
  }
}

function checkTweetId(tweetId) {
  if (!tweetId) {
    const error = new Error("El parámetro tweetId es requerido.");
    error.statusCode = 400; // Código de estado 400 Bad Request
    console.error(error.message);
    throw error;
  }
  const tweetIdNumber = parseInt(tweetId, 10);
  if (isNaN(tweetIdNumber)) {
    const error = new Error(
      `El parámetro '${tweetId}' no es un número válido.`
    );
    error.statusCode = 400; // Código de estado 400 Bad Request
    console.error(error.message);
    throw error;
  }
  return tweetIdNumber;
}
