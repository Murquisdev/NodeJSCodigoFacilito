const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");
// Se recomienda crear un pool de conexiones yy no una conexión directa
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // Valor por defecto si no está en .env
  user: process.env.DB_USER || "root", // Valor por defecto si no está en .env
  password: process.env.DB_PASSWORD, // ¡Cuidado! No uses valores por defecto para contraseñas en producción
  database: process.env.DB_DATABASE,
  waitForConnections: true, // Espera si todas las conexiones están en uso
  connectionLimit: 10, // Número máximo de conexiones en el pool (ajustar según necesidad)
  queueLimit: 0, // Cola ilimitada para peticiones
});

// Función para probar la conexión y obtener el nombre de la base de datos
async function testConnection() {
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();

    console.log("Conexión obtenida del pool.");

    // Comprobamos la conexión al recibir el nombre de la base de datos
    const [results] = await connection.query("SELECT DATABASE()");
    const databaseName = results[0]["DATABASE()"];
    console.log("Nombre de la base de datos:", databaseName);

    // Liberar la conexión al pool (¡IMPORTANTE!)
    connection.release();
    console.log("Conexión liberada al pool.");
  } catch (err) {
    console.error("Error al conectar o realizar la consulta:", err);
  }
}

//Ejecutamos la funcion
testConnection();

//Cerramos el pool al finalizar la app
process.on("exit", () => {
  pool.end();
  console.log("Pool cerrado");
});
process.on("SIGINT", () => {
  process.exit(0);
});

module.exports = pool; // Exportar el pool, no 'connection'

// Creando un alías en la consulta, resulta más facil acceder a ella.
/*
connection.query("SELECT DATABASE() AS db_name", (err, results) => {
  if (err) throw err;

  const databaseName = results[0].db_name; // Ahora puedes usar db_name directamente
  console.log("Nombre de la base de datos:", databaseName);
});
*/
