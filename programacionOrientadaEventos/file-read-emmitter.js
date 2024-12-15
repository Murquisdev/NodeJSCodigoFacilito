const fs = require("fs/promises");
const EventEmitter = require("events");

class FileReadEmitter extends EventEmitter {
  async readFile(file) {
    this.emit("beforeRead", file); // "beforeRead es un evento de emit"
    try {
      const data = await fs.readFile(file, "utf-8");
      this.emit("read", file, data);
      this.emit("afterRead", file);
    } catch (error) {
      this.emit("error", error);
    }
  }
}

const fileReadEmitter = new FileReadEmitter();

// Creo los eventos

fileReadEmitter.on("read", (file, data) => {
  console.log(`File ${file} read successfully`, data);
});

fileReadEmitter.on("error", (error) => {
  console.error(`There was an error: ${error.message}`);
});

fileReadEmitter.on("beforeRead", (file) => {
  console.log(`Reading file ${file}`);
});

fileReadEmitter.on("afterRead", (file) => {
  console.log(`Finishing reading ${file}`);
});

(async () => {
  await fileReadEmitter.readFile("archivo1.txt");
  await fileReadEmitter.readFile("archivo2.txt");
  await fileReadEmitter.readFile("archivo3.txt");
})();
