// cp: Copia directorios de forma recursiva
const fs = require("fs/promises"); // Usando la versión con promesas

async function copiar(src, dest) {
  try {
    await fs.cp(src, dest);
    console.log(`Copiado ${src} a ${dest} correctamente.`);
  } catch (err) {
    console.error("Error al copiar:", err);
  }
}

copiar("ruta/al/origen", "ruta/al/destino");

//fs.cp(source, destine, objeto)

// await fs.cp("directorio_origen", "directorio_destino", {
//   recursive: true,  // Copia los directorios de forma recursiva
//   force: false, // Sobreescribe en el destino
//   preserveTimestamps: false, // Conserva las marcas de tiempo originales
//   errorOnExist: false,  // Si está en true el destino existe la operación fallará
//   filter (function): Permite controlar que se copia.
// });

// await fs.cp('directorio_origen', 'directorio_destino', { recursive: true, force: true });

// await fs.cp('directorio_origen', 'directorio_destino', { recursive: true, preserveTimestamps: true });

// await fs.cp('directorio_origen', 'directorio_destino', {
//  recursive: true,
//  filter: (src) => src.endsWith('.txt') // Copia solo los archivo .txt
//});
