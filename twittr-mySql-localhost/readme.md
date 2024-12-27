# Conectar una base de datos MySql

Para conectar una base de datos MySql se necesita importar el módulo **mysql2** ( y _dotenv_ para las variables de entorno)

```bash
npm install mysql2 dontenv
```

Se recomienda utilizar un _pool_ de conexiones y no una forma directa:
| Característica | Pool de Conexiones | Conexión Directa |
| --------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Creación de conexión | `mysql.createPool()` (una vez al inicio) | `mysql.createConnection()` (en cada uso) |
| Obtención de conexión| `connection = await pool.getConnection()` | `connection = await mysql.createConnection()` |
| Liberación/Cierre | `connection.release()` (devuelve al pool) | `connection.close()` (cierra la conexión) |
| Cierre final | `pool.end()` (al finalizar la app) | No es necesario |
| Exportación | `module.exports = pool;` (para reutilizar el pool) | `module.exports = getDirectConnection;` (para utilizar la conexión) |

Las conexiones que se realicen se recomiendan utilizar un _pool_ de conexiones.

```javascript
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

module.exports = pool;
```

Si fuera una conexión directa:

```javascript
const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");

// Función para crear y obtener una conexión DIRECTA
async function getDirectConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("Conexión directa creada.");
    return connection;
  } catch (err) {
    console.error("Error al crear la conexión:", err);
    throw err; // Re-lanza el error para que sea manejado por el llamador
  }
}

// Función para probar la conexión (usando la conexión directa)
async function testDirectConnection() {
  let connection;
  try {
    connection = await getDirectConnection(); // Obtiene la conexión
    // Comprobamos la conexión al recibir el nombre de la base de datos
    const [results] = await connection.query("SELECT DATABASE()");
    const databaseName = results[0]["DATABASE()"];
    console.log("Nombre de la base de datos:", databaseName);
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
  } finally {
    if (connection) {
      await connection.close(); // Cerrar la conexión (¡IMPORTANTE!)
      console.log("Conexión directa cerrada.");
    }
  }
}

//Ejecutamos la funcion
testDirectConnection();

module.exports = getDirectConnection; // Exportamos la función para obtener la conexión
```
