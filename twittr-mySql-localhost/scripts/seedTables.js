const pool = require("../lib/connect"); // Asumes que "../lib/connect" exporta el pool

// Definición de las consultas
const createUsersTable = `CREATE TABLE users (
  userId INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  bio TEXT,
  location VARCHAR(255),
  PRIMARY KEY (userId)
)`;

const createTweetsTable = `CREATE TABLE tweets (
  tweetId INT AUTO_INCREMENT,
  userId INT,
  content VARCHAR(280),
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweetId)
)`;

const insertUsers = `INSERT INTO users (username, email, passwordHash, bio, location)
  VALUES 
  ('JohnDoe', 'johndoe@example.com', 'hashedpassword1', 'I love coding', 'New York'),
  ('JaneDoe', 'janedoe@example.com', 'hashedpassword2', 'I love databases', 'San Francisco')`;

const printError = (msg) => (error) => {
  error && console.log(msg, error);
};

async function createTablesAndInsertUsers() {
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();

    // Crear las tablas
    await connection.query(createUsersTable);
    console.log("Users table created successfully.");
    await connection.query(createTweetsTable);
    console.log("Tweets table created successfully.");

    // Insertar usuarios
    await connection.query(insertUsers);
    console.log("Users inserted successfully.");

    // Liberar la conexión al pool
    connection.release();
    console.log("Connection released to the pool.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar el pool al finalizar la ejecución del script (opcional)
    // pool.end() // Comentar o descomentar esta línea según tu necesidad
  }
}

// Ejecutar la función
createTablesAndInsertUsers();
