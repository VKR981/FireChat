import socketIO from "socket.io-client";
import * as Device from "expo-device";

export let socket;

export const initSocket = () => {
  console.log("connecting....");
  console.log(Device.osName === "Android" || Device.osName === "iOS");
  socket = socketIO(
    Device.osName === "Android" || Device.osName === "iOS"
      ? "http://192.168.56.1:3000"
      : "http://127.0.0.1:3000",
    {
      transports: ["websocket"],
      jsonp: false,
    }
  );

  socket.connect();

  socket.on("connect", () => {
    console.log("connected to socket server");
  });
};



export const sendMessage = (msg) => {
  if (socket) {
    socket.emit("chatMessage", msg);
  } else {
    console.log("socket empty");
  }
};
