import { colors, createRandom, throttle, debounce } from "./utils";

const numbers = {};

function createCards() {
  count = createRandom(42, 84);

  rest.innerHTML = count.toString();

  const max = Math.floor(count / 21) * 10 + 15;
  const remainder = 0.978 ** (count - 90);

  for (let i = 0; i < count; i++) {
    let number = Math.round(Math.random() * 99);

    if (i % remainder <= 0.99 && i < max) {
      const keys = Object.keys(numbers);
      if (keys.length >= 3) {
        const index = createRandom(0, keys.length - 1);
        number = +keys[index];
      }
    }
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
      const x = createRandom(0, 35);
      const y = -createRandom(0, 35);
      node.style.transform = `translate(calc(var(--grid-size) * ${x}), calc(var(--grid-size) * ${y}))`;
      node.style.color = color;
      node.style.zIndex = createRandom(0, 4).toString();
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

function findIndexes(arr: number[], value: number) {
  let indexes: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) indexes.push(i);
    if (indexes.length === 2) return indexes;
  }
  return indexes;
}

function resort() {
  stack.forEach((el, i) => {
    el.style.transform = `translate(${i * cardSize}px, ${cardSize + 2}px)`;
  });
}

const refresh = document.querySelector(".refresh") as HTMLButtonElement;
const container = document.querySelector(".container") as HTMLDListElement;
const rest = document.querySelector(".rest") as HTMLParagraphElement;
const stage = document.querySelector(".stage") as HTMLDivElement;

let count = 0;
let stack: HTMLDivElement[] = [];

function handleStageClick(e: MouseEvent) {
  const el = e.target as HTMLDivElement;
  if (!el.classList.contains("card")) return;
  if (stack.includes(el)) return;
  el.style.transform = `translate(${stack.length * cardSize}px, ${
    cardSize + 2
  }px)`;
  el.style.zIndex = "5";
  const value = +el.innerHTML;
  const [i1, i2] = findIndexes(
    stack.map((el) => +el.innerHTML),
    value
  );
  if (i2) {
    stack = [...stack.slice(0, i2 + 1), el, ...stack.slice(i2 + 1)];
    resort();
    const item1 = stack[i1];
    const item2 = stack[i2];
    stack.splice(i1, 1);
    stack.splice(i2 - 1, 1);
    stack.splice(i2 - 1, 1);
    el.addEventListener("transitionend", () => {
      el.remove();
      item1.remove();
      item2.remove();
      resort();
      count--;
      rest.innerHTML = count.toString();

      if (!count) {
        alert("You win");
        startGame();
      }
    });
  } else {
    if (i1 !== undefined) {
      stack = [...stack.slice(0, i1 + 1), el, ...stack.slice(i1 + 1)];
      resort();
    } else {
      stack.push(el);
    }
  }
  if (stack.length === 8) {
    alert("You lose!");
    startGame();
  }
}

let cardSize = 50;

function handleResize() {
  const { clientWidth } = document.documentElement;
  cardSize = Math.min(Math.floor((clientWidth - 40 - 4) / 8), 50);

  container.style.setProperty("--card-size", `${cardSize}px`);
  container.style.setProperty("--grid-size", `${cardSize / 5}px`);
}

window.addEventListener("resize", debounce(handleResize));
refresh.addEventListener("click", debounce(startGame));
stage.addEventListener("click", throttle(handleStageClick));

handleResize();
startGame();
