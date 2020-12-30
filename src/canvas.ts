const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

export const ctx = canvas.getContext("2d");

// fill green
ctx.fillStyle = "white";
// ctx.fillRect(10, 10, 150, 100);
ctx.fillRect(0, 0, 512, 256);
ctx.strokeStyle = "black";
// ctx.lineWidth = 1;
// ctx.shadowBlur = 0;
ctx.fillRect(0, 0, 512, 256);
// ctx.strokeRect(10, 10, 150, 100);
