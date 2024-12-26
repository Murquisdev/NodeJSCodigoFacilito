const pool = require("../lib/connect"); // Importa el pool

const insertTweets = `INSERT INTO tweets (userId, content)
VALUES 
(1, 'This is my first tweet!'),
(1, 'This is my second tweet!'),
(1, 'I love coding'),
(1, 'Node.js is awesome'),
(1, 'Just finished my OpenAI project'),
(2, 'Hello Twitter!'),
(2, 'This is Jane\\'s second tweet!'),
(2, 'I love databases'),
(2, 'MySQL is great'),
(2, 'Just finished a database design project')`;

async function insertTweetsIntoDatabase() {
  try {
    const connection = await pool.getConnection(); // Obtiene una conexión del pool
    console.log("Conexión obtenida del pool.");

    await connection.query(insertTweets);
    console.log("Inserting tweets done!");

    connection.release(); // Libera la conexión al pool
    console.log("Conexión liberada al pool.");
  } catch (error) {
    console.error("Error inserting tweets:", error);
  } finally {
    // Puedes comentar o descomentar esta línea según tu necesidad
    //pool.end()
  }
}

insertTweetsIntoDatabase();
