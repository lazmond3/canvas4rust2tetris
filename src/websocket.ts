export const sock = new WebSocket("ws://127.0.0.1:5001");
export function connect(
  eventListener: (message_e: MessageEvent<string>) => void
) {
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
      connect(eventListener);
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
