const sock = new WebSocket("ws://127.0.0.1:5001");
import { ctx } from "./canvas";
sock.addEventListener("open", (e) => {
  console.log("接続が開かれたときに呼び出されるイベント");
});
function connect() {
  var ws = new WebSocket("ws://127.0.0.1:5001");
  ws.onopen = function () {
    console.log(`connect open on.`);
  };

  ws.onmessage = function (e) {
    console.log("Message:", e.data);
    eventListener(e);
  };

  ws.onclose = function (e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 1000);
  };

  ws.onerror = function (err) {
    console.log("エラーが発生したときに呼び出されるイベント");
    console.error(
      "Socket encountered error: ",
      (err as any).message,
      "Closing socket"
    );
    ws.close();
  };
}

connect();

const eventListener = (message_e: MessageEvent<string>) => {
  console.log("メッセージ : " + `${message_e.data}`);
  const data = JSON.parse(message_e.data);
  if (data.type === "one_word") {
    const pos = data.pos;
    const word: string = data.word;
    console.log(`one word req: pos: ${pos}, word: ${word}`);
    const x = (pos % 32) * 16;
    const y = Math.floor(pos / 32);
    console.log(`x: ${x}, y: ${y}`);
    for (var i = 0; i < 16; i++) {
      const char = word[i];
      if (char === "O") {
        ctx.fillStyle = "white";
        ctx.fillRect(x + i, y, 1, 1);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(x + i, y, 1, 1);
      }
    }
    console.log(`fill ends.`);
  }
};

const btn = document.querySelector("#hello-button");
const input_value = document.querySelector<HTMLInputElement>("#input");
btn.addEventListener("click", () => {
  console.log(`input_value: ${input_value.value}`);
  sock.send(input_value.value);
});
