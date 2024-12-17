const fs = require("fs");

const readableStream = fs.createReadStream("./Quijote.txt");
const writableStream = fs.createWriteStream("./morse_Quijote.txt");

readableStream.on("data", (chunk) => {
  const morse = textoAMorse(chunk.toString());
  writableStream.write(morse);
});

readableStream.on("end", () => {
  writableStream.end();
  console.log("Fin del libro");
});

writableStream.on("finish", () => {
  console.log("Fin de escritura del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});
writableStream.on("error", () => {
  console.log("Error en la escritura");
});

// Creamos un mapa de conversión con un objeto
const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/", // Espacio entre palabras
};

function textoAMorse(texto) {
  texto = texto.toUpperCase(); // Convertir a mayúsculas para simplificar la búsqueda
  let morse = "";
  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    if (morseCodeMap[char]) {
      morse += morseCodeMap[char] + " "; // Añadir espacio entre caracteres
    } else if (char === " ") {
      morse += "/ "; // Separador de palabras
    } else if (char === "\n") {
      morse += "\n";
    }
  }
  return morse.trim(); // Eliminar espacios extras al final
}
