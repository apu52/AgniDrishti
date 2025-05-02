// src/socket.ts
import { io, Socket } from "socket.io-client";

 const URL = "https://agnidrishtibackend.onrender.com"; // change for production
// const URL="http://localhost:3000"
const socket: Socket = io(URL, {
  autoConnect: true,
});

export default socket;
