const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

app.get("*", (req, res) => {
  res.send("Wrong Url");
});
// Socket
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e7,
});

let socketUserList = [];

io.on("connection", (socket) => {
  const userInfo = socket.handshake.query;
  // Check if the user already exists based on email
  const existingUser = socketUserList.find(
    (user) => user.email === userInfo.email
  );

  if (!existingUser) {
    // Add user to the list if they are not already in it
    socketUserList.push({
      userId: socketUserList.length + 1,
      email: userInfo.email,
      socketId: socket.id,
    });
  } else {
    // Update the socketId if the user is reconnecting
    existingUser.socketId = socket.id;
  }

  socket.on("send-message", ({ from, to, message }) => {
    // Find the recipient in the socketUserList based on their email
    const recipient = socketUserList.find((user) => user.email === to);

    if (recipient) {
      // Emit the message to the recipient using their socketId
      io.to(recipient.socketId).emit("received-message", {
        from,
        message,
        time: new Date().toLocaleTimeString(),
      });
    } else {
      console.log(`User ${to} not found`);
    }
  });
  socket.on("request-check-active-status", ({ userEmail }) => {
    const existingActiveUser = socketUserList.find(
      (user) => user.email === userEmail
    );

    if (existingActiveUser) {
      console.log("existingActiveUser", existingActiveUser);
      io.to(socket.id).emit("recive-active-status", {
        isActive: true,
      });
    } else {
      io.to(socket.id).emit("recive-active-status", {
        isActive: false,
      });
    }
  });

  socket.on("disconnect", () => {
    // Remove user from the list
    socketUserList = socketUserList.filter(
      (user) => user.socketId !== socket.id
    );
  });
});
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
