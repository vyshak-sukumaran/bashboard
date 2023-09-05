import type { IDrawOptions } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function drawWithDataURL(
  dataURL: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement
) {
  const image = new Image();
  image.src = dataURL;
  image.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(image, 0, 0);
  }
}

export function draw(drawOptions: IDrawOptions) {
  const { ctx, currentPoint, prevPoint, strokeColor, strokeWidth, dashGap } =
    drawOptions;

  const startPoint = prevPoint ?? currentPoint;

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth[0];
  ctx.setLineDash(dashGap);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // start new path
  ctx.beginPath();
  // places the cursor to the start point
  ctx.moveTo(startPoint.x, startPoint.y);
  // draws line from the start point to the current point
  ctx.lineTo(currentPoint.x, currentPoint.y);
  // adding stroke to the line (rendering part)
  ctx.stroke();
}
