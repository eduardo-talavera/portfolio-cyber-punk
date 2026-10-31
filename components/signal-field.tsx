"use client";

import { useEffect, useRef } from "react";
import styles from "./signal-field.module.css";

type Point = {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
};

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5 };
    let points: Point[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;

    const createPoints = () => {
      const amount = Math.min(68, Math.max(30, Math.floor(width / 24)));
      points = Array.from({ length: amount }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        speed: 0.00002 + Math.random() * 0.00005,
        size: 0.6 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createPoints();
      if (reduceMotion) draw();
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / width;
      pointer.y = event.clientY / height;
    };

    const draw = (time = 0) => {
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;
      context.clearRect(0, 0, width, height);

      const dark = document.documentElement.dataset.theme !== "light";
      const primary = dark ? "126, 255, 72" : "18, 126, 85";
      const secondary = dark ? "79, 221, 255" : "0, 105, 145";

      points.forEach((point, index) => {
        if (!reduceMotion) {
          point.z += point.speed * delta;
          if (point.z > 1) point.z = 0;
        }

        const depth = 0.35 + point.z * 0.9;
        const x = (point.x - 0.5) * width * depth + width / 2 + (pointer.x - 0.5) * -24 * point.z;
        const y = (point.y - 0.5) * height * depth + height / 2 + (pointer.y - 0.5) * -18 * point.z;
        const radius = point.size * (0.45 + point.z);

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${index % 4 === 0 ? secondary : primary}, ${0.16 + point.z * 0.42})`;
        context.fill();

        for (let neighborIndex = index + 1; neighborIndex < Math.min(index + 5, points.length); neighborIndex += 1) {
          const neighbor = points[neighborIndex];
          const neighborDepth = 0.35 + neighbor.z * 0.9;
          const neighborX = (neighbor.x - 0.5) * width * neighborDepth + width / 2;
          const neighborY = (neighbor.y - 0.5) * height * neighborDepth + height / 2;
          const distance = Math.hypot(x - neighborX, y - neighborY);

          if (distance < 145) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(neighborX, neighborY);
            context.strokeStyle = `rgba(${primary}, ${(1 - distance / 145) * 0.1})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }
      });

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
      frame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
