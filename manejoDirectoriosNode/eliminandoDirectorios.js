// rm: Elimina carpetas y archivos de forma recursiva
const fs = require("fs/promises");

async function eliminar(ruta) {
  try {
    await fs.rm(ruta, { recursive: true, force: true }); // Opciones importantes
    console.log(`Eliminado ${ruta} correctamente.`);
  } catch (err) {
    console.error(`Error al eliminar ${ruta}:`, err);
  }
}

eliminar("./mi_archivo_o_directorio");

/*
fs.rm(ruta, {
    recursive: false, // Indica si queremos que elimine el interior del directorio
    force: false, // Si queremos ignorar los errores ENOENT (No entry - la ruta no exite)
    maxRetries: número // Número de intentos
    retryDelay: número // espacio entre intentos. 
})

Eliminar un archivo:
await fs.rm('./mi_archivo.txt'); // No necesita 'recursive' ni 'force' para archivos

Eliminar un directorio y su contenido:
await fs.rm('./mi_directorio', { recursive: true, force: true });

await fs.rm('./mi_directorio', { recursive: true }); // Lanzará un error si el directorio no existe

await fs.rm('./mi_directorio', { recursive: true, force: true, maxRetries: 3, retryDelay: 1000 }); // Reintentará 3 veces con un retraso de 1 segundo entre cada intento
*/
