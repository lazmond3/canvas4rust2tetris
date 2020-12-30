// EXP: このファイルは、 API を叩かれたら、 websocketを通じて
// html に入っている canvas のアップデートを行うもの。
// TODO: nodejs による サーバを作成する
const http = require("http");
const hostname = "127.0.0.1";
const api_port = 3000;
const ws_port = 5001;

// API サーバ
const api_server = http.createServer((req, res) => {
  // ここにrequestを書いていく
  const ws_message = make_ws_server();

  if (req.type === "one_word") {
    const pos = req.position;
    const word = req.word;

    ws_message.then(({ ws, message }) => {
      ws.send(JSON.stringify(req));
    });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});
api_server.listen(api_port, hostname, () => {
  console.log(
    `API Server running at http://${hostname}:${api_port}/: api server`
  );
});

//  -----------------  WS_server --------------------
function make_ws_server() {
  const ws_server = require("ws").Server;
  const s = new ws_server({
    host: hostname,
    port: ws_port,
  });

  console.log(`start listening... : websocket server`);

  return new Promise((resolve, reject) => {
    s.on("connection", (ws) => {
      ws.on("message", (message) => {
        resolve({ ws, message });
        // console.log("Received: " + message);

        // if (message === "hello") {
        //   ws.send("hello from server");
        // } else if (message === "test") {
        //   ws.send("test from server");
        // }
      });
    });
  });
}
//  -----------------  WS_server --------------------
