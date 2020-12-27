const server = require("ws").Server;
const s = new server({
  host: "localhost",
  port: 5001,
});

console.log(`start listening... : ${s.host}:${s.port}`);
s.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received: " + message);

    if (message === "hello") {
      ws.send("hello from server");
    } else if (message === "test") {
      ws.send("test from server");
      ws.send({ message: "from_server", error: null });
    }
  });
});
