require("dotenv").config(); // Cargamos las variables de entorno
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
const port = process.env.PORT || 3000;

app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Prueba").select("*").limit(1);

    if (error) {
      console.error("Error al consultar Supabase:", error);
      if (error.code === "ECONNREFUSED") {
        return res.status(500).json({
          error:
            "No se pudo conectar al servidor Supabase. Verifica la URL y la conexión de red.",
        });
      }
      return res.status(500).json({
        error: "Error al conectar con Supabase",
        details: error.message,
      });
    }

    res.json({ message: "Conexión a Supabase exitosa", data });
  } catch (error) {
    console.error("Error en la petición:", error);
    return res
      .status(500)
      .json({ error: "Error en la petición", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
