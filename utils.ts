export const colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#ff3f34",
  "#3c40c6",
  "#44bd32",
  "#c23616",
  "#fbc531",
];

export function createRandom(min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(Math.random() * max)));
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
