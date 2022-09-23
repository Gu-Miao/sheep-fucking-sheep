import { colors, createRandom, throttle } from "./utils";

function createCards() {
  const count = createRandom(20, 100);
  const numbers = {};

  for (let i = 0; i < count; i++) {
    const number = Math.round(Math.random() * 100);
    let color: string;
    if (number in numbers) {
      color = numbers[number];
    } else {
      color = colors[createRandom(0, colors.length - 1)];
      numbers[number] = color;
    }

    for (let j = 0; j < 3; j++) {
      const node = document.createElement("div");
      node.classList.add("card");
      const x = createRandom(0, 35) * 10;
      const y = -createRandom(0, 35) * 10;
      node.style.transform = `translate(${x}px, ${y}px)`;
      node.style.color = color;
      node.innerHTML = number.toString();
      stage.append(node);
    }
  }
}

function startGame() {
  stack = [];
  stage.innerHTML = "";
  createCards();
}

function shouldRemove(arr: number[], value: number) {
  let indexes: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) indexes.push(i);
    if (indexes.length === 2) return indexes;
  }
  return false;
}

function resort() {
  stack.forEach((el, i) => {
    el.style.transform = `translate(${i * 50}px, 51px)`;
  });
}

const stage = document.querySelector(".stage") as HTMLDivElement;

let stack: HTMLDivElement[] = [];

function handleStageClick(e: MouseEvent) {
  const el = e.target as HTMLDivElement;
  if (!el.classList.contains("card")) return;
  if (stack.includes(el)) return;
  el.style.transform = `translate(${stack.length * 50}px, 51px)`;
  el.style.zIndex = "5";
  const value = +el.innerHTML;
  const items = shouldRemove(
    stack.map((el) => +el.innerHTML),
    value
  );
  if (items) {
    const item1 = stack[items[0]];
    const item2 = stack[items[1]];
    stack.splice(items[0], 1);
    stack.splice(items[1] - 1, 1);
    el.addEventListener("transitionend", () => {
      el.remove();
      item1.remove();
      item2.remove();
      resort();

      if (!document.querySelector(".card")) {
        alert("You win");
        startGame();
      }
    });
  } else {
    stack.push(el);
  }
  if (stack.length === 8) {
    alert("You lose!");
    startGame();
  }
}

stage.addEventListener("click", throttle(handleStageClick, 200));

startGame();
