# Creando una conexión con SUPABASE

Necesitamos 3 paquetes, express, @supabase/supabase-js y dotenv

- Express: Facilita las conexiones HTTP
- @supabase/supabase-js: De los paquetes de supabase, le indicamos que vamos a trabajar con JS
- dotenv: Para trabajar con **variables de entorno**

```bash
npm init -y
npm install express @supabase/supabase-js dotenv
```

## Antes de codear, política de tabla en la base de datos

Es importante que al crear una tabla en **supabase** se le declare una política para poder tener acceso a sus datos.
Esto se puede conseguir en la consola SQL de Supabase:

```sql
CREATE POLICY "Enable all for testing"
  ON public."Prueba" -- Reemplaza "Prueba" con el nombre real de tu tabla
  FOR ALL -- Permite SELECT, INSERT, UPDATE y DELETE
  USING (TRUE); -- Esta condición SIEMPRE se cumple, permitiendo el acceso a todas las filas
```

Un ejemplo de política más correcta sería:

```sql
CREATE POLICY "Users can see their own or if admin"
  ON public."Prueba"
  FOR SELECT
  USING (auth.uid() = user_id OR auth.user().raw_user_meta_data->>'role' = 'admin');
```

## Importar librerías y preparar conexiones

```js
require("dotenv").config(); // Cargamos las variables de entorno que tenemos en .env
const express = require("express");
// Extraemos con desestructuración la función createClient del objeto que devuelve @supabase/supabase-js
const { createClient } = require("@supabase/supabase-js");
// process es un objeto global de Node.js que representa el proceso actual
// process.env accede a las variables de entorno que hay en Node.js
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Creamos la instancia del cliente con Supabase, es decir, establecemos la conexión.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
const port = process.env.PORT || 3000;
```

## Conectar con la BBDD

Las conexiones se realizan con formatos muy parecidos a consultas SQL

```javascript
app.get("/test-supabase", async (req, res) => {
  try {
    // SQL: SELECT * FROM "Prueba" LIMIT 1;
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
```
