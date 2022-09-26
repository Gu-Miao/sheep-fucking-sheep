export const colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#7f8c8d",
  "#e84118",
];

export function createRandom(min: number, max: number) {
  return Math.min(
    max,
    Math.max(min, Math.round(Math.random() * (max - min) + min))
  );
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  timeFrame: number
) {
  let lastTime = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
