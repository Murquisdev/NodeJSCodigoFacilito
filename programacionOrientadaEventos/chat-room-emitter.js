const EventEmitter = require("events"); //Cargamos los eventos

class ChatRoom extends EventEmitter {
  join(user) {
    // Cada vez que entra un usuario
    console.log(`${user} joined the chat room`);
    this.emit("join", user); // "join" es un evento
  }

  sendMessage(user, message) {
    console.log(`${user} sent a message: ${message}`);
    this.emit("message", user, message); // "message" es un evento
  }
}

const chatRoom = new ChatRoom();

// ON es el método que permite escuchar los eventos
// Esto es programación asíncrona, queda escuchando a que ocurra el evento join
// para procesar las líneas de programación

// Cada vez que ocurra join
chatRoom.on("join", (user) => {
  console.log(`Welcome ${user}!`);
});
// Cada vez que ocurra message
chatRoom.on("message", (user, message) => {
  console.log(`New message from ${user}: ${message}`);
});

chatRoom.join("John");
chatRoom.join("Jane");
chatRoom.sendMessage("John", "Hello World!");
chatRoom.sendMessage("Jane", "Hello John!");
