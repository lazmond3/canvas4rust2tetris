const sock = new WebSocket("ws://127.0.0.1:5001");
sock.addEventListener("open", (e) => {
  console.log("接続が開かれたときに呼び出されるイベント");
});

sock.addEventListener("message", (e) => {
  console.log(
    "サーバーからメッセージを受信したときに呼び出されるイベント: " + `${e}`
  );
});

sock.addEventListener("close", (e) => {
  console.log("接続が閉じられたときに呼び出されるイベント");
});

sock.addEventListener("error", (e) => {
  console.log("エラーが発生したときに呼び出されるイベント");
});

const btn = document.querySelector("#hello-button");
const input_value = document.querySelector("#input");
btn.addEventListener("click", () => {
  console.log(`input_value: ${input_value.value}`);
  sock.send(input_value.value);
});
