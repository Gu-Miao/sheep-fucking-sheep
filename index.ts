const colors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#f39c12',
  '#d35400',
  '#c0392b',
]

function createRandom(min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(Math.random() * max)))
}

function createXYZ() {
  return [createRandom(1, 13) * 25, -createRandom(1, 13) * 25, createRandom(0, 4)]
}

function shouldRemove(arr: number[], value: number) {
  let indexes: number[] = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) indexes.push(i)
    if (indexes.length === 2) return indexes
  }
  return false
}

function generateData() {
  const result: string[] = []
  const count = createRandom(10, 20)
  for (let i = 0; i < count; i++) {
    const number = Math.round(Math.random() * 100)
    const color = colors[createRandom(0, colors.length - 1)]
    for (let j = 0; j < 3; j++) {
      const [x, y, z] = createXYZ()
      result.push(
        `<div class="card" style="transform: translate(${x}px, ${y}px); z-index: ${z}; color: ${color};">${number}</div>`
      )
    }
  }

  const stage = document.querySelector('.stage') as HTMLDivElement
  stage.innerHTML = result.join('\n')

  stage.addEventListener('click', e => {
    const el = e.target as HTMLDivElement
    if (!el.classList.contains('card')) return
    el.style.transform = `translate(${stack.length * 50}px, 52px)`
    const value = +el.innerHTML
    const items = shouldRemove(
      stack.map(el => +el.innerHTML),
      value
    )
    if (items) {
      el.remove()
      stack[items[0]].remove()
      stack[items[1]].remove()
      stack.splice(items[0], 1)
      stack.splice(items[1] - 1, 1)
      if (!document.querySelector('.card')) {
        alert('You win')
        window.location.reload()
      }
    } else {
      stack.push(el)
    }
    if (stack.length === 8) {
      alert('You lose!')
      window.location.reload()
    }
  })
}

generateData()

const stack: HTMLDivElement[] = []
