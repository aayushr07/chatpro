// lib/socket.js
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  autoConnect: true, // Only connect after user is authenticated
  transports: ["websocket"],
});

export default socket;
