// EXP: このファイルは、 API を叩かれたら、 websocketを通じて
// html に入っている canvas のアップデートを行うもの。
// TODO: nodejs による サーバを作成する
// TODO: serverが自動でwsを繋ぎ直すようにしたい。
const http = require("http");
const hostname = "127.0.0.1";
const api_port = 3000;
const ws_port = 5001;

const msock = (ws) => (req, res) => {
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

        console.log(`send websocket`);
        ws.send(JSON.stringify(body));
      }
    });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Received.\n");
};

function up_ws_server() {
  const ws_server = require("ws").Server;
  let api_server;

  const s = new ws_server({
    host: hostname,
    port: ws_port,
  });
  s.on("error", (e) => {
    console.log(`error: ${e}`);
    if (api_server) {
      api_server.close();
    }
  });
  s.on("close", () => {
    console.log("close...");
    if (api_server) {
      api_server.close();
    }
    setTimeout(function () {
      up_ws_server();
    }, 1000);
  });
  s.on("connection", (ws) => {
    const method = msock(ws);
    if (api_server) {
      api_server.close();
    }
    try {
      api_server = http.createServer(method);
    } catch (e) {
      console.log(`address in use...`);
    }
    api_server.listen(api_port, hostname, () => {
      console.log(
        `API Server running at http://${hostname}:${api_port}/: api server`
      );
    });
  });
}
up_ws_server();
