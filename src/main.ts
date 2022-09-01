import { Clock } from './Clock'
import './style.css'

const canvas = document.getElementById("canvas1") as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight


const ctx = canvas.getContext("2d")!

ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)


const clock = new Clock(canvas, ctx)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  clock.draw()
}

setInterval(() => {
  animate()
}, 1000)


window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  clock.resize()
})
