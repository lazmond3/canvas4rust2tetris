import { ctx } from "./canvas";
import { sock, connect } from "./websocket";

// sockとctxの繋ぎ込み
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
connect(eventListener);

const btn = document.querySelector("#hello-button");
const input_value = document.querySelector<HTMLInputElement>("#input");
btn.addEventListener("click", () => {
  console.log(`input_value: ${input_value.value}`);
  sock.send(input_value.value);
});
