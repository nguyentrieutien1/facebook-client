import { variable } from "./../contains/variable";
import { io } from "socket.io-client";
const socket = io(variable.url, { transports: ["websocket"] });
export default socket;
