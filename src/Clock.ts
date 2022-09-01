export class Clock {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  height: number
  width: number
  hourDivisions: number
  color: string
  radius: number
  hourHandLength: number
  minuteHandLength: number
  secondHandLength: number

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.height = this.canvas.height
    this.width = this.canvas.width
    this.hourDivisions = 12
    this.color = "green"
    this.radius = Math.min(this.height, this.width) / 2 - 70
    this.hourHandLength = this.radius / 2
    this.minuteHandLength = this.radius / 1.5
    this.secondHandLength = this.radius / 1.2
  }


  draw() {
    this.ctx.save()
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.strokeStyle = this.color
    this.ctx.moveTo(0, 0)

    this.createCircle(0, 0, this.radius, 20)
    this.createHourDivisions()
    this.createHourHand()
    this.createMinuteHand()
    this.createSecondHand()
    this.createCircle(0, 0, this.radius / 30, 5)

    this.ctx.restore()
  }

  resize() {
    this.height = this.canvas.height
    this.width = this.canvas.width
    this.radius = Math.min(this.height, this.width) / 2 - 70
    this.hourHandLength = this.radius / 2
    this.minuteHandLength = this.radius / 1.5
    this.secondHandLength = this.radius / 1.2
  }

  private createCircle(x: number, y: number, radius: number, lineWidth: number = 10) {
    this.ctx.save()
    this.ctx.lineWidth = lineWidth
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.restore()
  }

  private createHourDivisions() {
    this.ctx.save()
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = 10

    const rotationAngle = (2 * Math.PI) / this.hourDivisions
    for (let i = 0; i < this.hourDivisions; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.radius / 1.05, 0)
      this.ctx.lineTo(this.radius, 0)
      this.ctx.stroke()
      this.ctx.rotate(rotationAngle)
    }

    this.ctx.restore()
  }

  private createHourHand() {

    const currHour = new Date().getHours() % 12

    this.ctx.save()
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = 15

    this.ctx.rotate(-1 * Math.PI / 2)
    this.ctx.rotate(currHour * ((2 * Math.PI) / 12))
    this.ctx.moveTo(-1 * this.radius / 20, 0)
    this.ctx.lineTo(this.hourHandLength, 0)
    this.ctx.stroke()

    this.ctx.restore()
  }

  private createMinuteHand() {
    const currMinute = new Date().getMinutes() % 60

    this.ctx.save()
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = 10

    this.ctx.rotate(-1 * Math.PI / 2)
    this.ctx.rotate(currMinute * ((2 * Math.PI) / 60))
    this.ctx.moveTo(-1 * this.radius / 10, 0)
    this.ctx.lineTo(this.minuteHandLength, 0)
    this.ctx.stroke()

    this.ctx.restore()
  }

  private createSecondHand() {
    const currSeconds = new Date().getSeconds() % 60

    this.ctx.save()
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = 3

    this.ctx.rotate(-1 * Math.PI / 2)
    this.ctx.rotate(currSeconds * ((2 * Math.PI) / 60))
    this.ctx.moveTo(-1 * this.radius / 10, 0)
    this.ctx.lineTo(this.secondHandLength, 0)
    this.ctx.stroke()

    this.ctx.restore()
  }
}

