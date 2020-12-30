// EXP: このファイルは、 API を叩かれたら、 websocketを通じて
// html に入っている canvas のアップデートを行うもの。
// TODO: nodejs による サーバを作成する
const http = require("http");
const hostname = "127.0.0.1";
const api_port = 3000;
const ws_port = 5001;

// ws server
const ws_message = make_ws_server();

// API サーバ
const api_server = http.createServer((req, res) => {
  // ここにrequestを書いていく
  var bodyChunks = [];
  let body;
  req
    .on("data", function (chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    })
    .on("end", function () {
      const bodyString = Buffer.concat(bodyChunks);
      body = JSON.parse(bodyString);
      //   console.log("BODY: " + body);
      // ...and/or process the entire body here.
      console.log(`body: ${JSON.stringify(body)}`);
      if (body.type === "one_word") {
        const pos = body.pos;
        const word = body.word;
        console.log(`pos: ${pos}, word: ${word}`);

        ws_message
          .then((ws) => {
            console.log(`send websocket`);
            ws.send(JSON.stringify(body));
            console.log(`send websocket`);
          })
          .catch((e) => {
            console.log(`error in ws_message: ${e}`);
          });
      }
    });

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
      resolve(ws);
      //   ws.on("message", (message) => {
      //     resolve({ ws, message });
      //   });
    });
    s.on("error", (e) => {
      reject(e);
    });
  });
}
//  -----------------  WS_server --------------------
