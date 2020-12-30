const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
canvas.width = 512;
canvas.height = 256;
canvas.style.width = "512px";
canvas.style.height = "256px";

export const ctx = canvas.getContext("2d");

// ctx.scale(1, 1);
// ctx.scale(0.5, 0.5);
// fill green
ctx.fillStyle = "white";
// ctx.fillRect(10, 10, 150, 100);
ctx.fillRect(0, 0, 512, 256);
ctx.strokeStyle = "black";
// ctx.lineWidth = 1;
// ctx.shadowBlur = 0;
ctx.fillRect(0, 0, 512, 256);
// ctx.strokeRect(10, 10, 150, 100);
