// EXP: このファイルは、 API を叩かれたら、 websocketを通じて
// html に入っている canvas のアップデートを行うもの。
// TODO: nodejs による サーバを作成する
// TODO: serverが自動でwsを繋ぎ直すようにしたい。
const http = require("http");
const hostname = "127.0.0.1";
const api_port = 3000;
const ws_port = 5001;

// ws server
let ws_message = make_ws_server();

const make_http_server = (req, res) => {
  // ここにrequestを書いていく
  var bodyChunks = [];
  let body;
  req
    .on("data", function (chunk) {
      bodyChunks.push(chunk);
    })
    .on("end", function () {
      const bodyString = Buffer.concat(bodyChunks);
      body = JSON.parse(bodyString);
      console.log(`body: ${JSON.stringify(body)}`);
      if (body.type === "one_word") {
        const pos = body.pos;
        const word = body.word;
        console.log(`pos: ${pos}, word: ${word}`);

        // こいつがクロージャになっているために、
        // ws_message が更新されても、反映されない.
        ws_message
          .then((ws) => {
            console.log(`send websocket`);
            ws.send(JSON.stringify(body));
          })
          .catch((e) => {
            console.log(`error in ws_message: ${e}`);
          });
      }
    });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Received.\n");
};

// API サーバ
const api_server = http.createServer(make_http_server);

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
    s.on("error", (e) => {
      ws_message = make_ws_server();
      reject(e);
    });
    s.on("close", () => {
      ws_message = make_ws_server();
    });
    s.on("connection", (ws) => {
      resolve(ws);
    });
  });
}
//  -----------------  WS_server --------------------
