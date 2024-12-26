const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.SUPABASE_URL);

console.log("Connected to database");

module.exports = connection;
