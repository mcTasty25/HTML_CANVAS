const canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext("2d");

function Dot(x, y, speed, color) {
    this.x = x
    this.y = y
    this.radius = 6
    this.speed = speed
    this.color = color
    this.dx = (Math.random() - 0.5) * this.speed;
    this.dy = (Math.random() - 0.5) * this.speed;
}

Dot.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Dot.prototype.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
}

function calculateDistance(dot1, dot2) {
    const dx = dot2.x - dot1.x
    const dy = dot2.y - dot1.y
    return Math.sqrt(dx * dx + dy * dy)
}

function connectDots(dots, maxDistance) {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const distance = calculateDistance(dots[i], dots[j])
            if (distance < maxDistance) {
                c.beginPath()
                c.moveTo(dots[i].x, dots[i].y)
                c.lineTo(dots[j].x, dots[j].y)
                c.strokeStyle = '#343533'
                c.lineWidth = 2
                c.stroke()
                c.closePath()
            }
        }
    }
}

const dots = []
const dostsNo = 100
const maxDistance = 200

for (let i = 0; i < dostsNo; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = 1
    dots.push(new Dot(x, y, speed, `hsl(${Math.random() * 360},100%,50%)`))
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = '#141414 '
    c.fillRect(0, 0, canvas.width, canvas.height)

    connectDots(dots, maxDistance)

    for (let i = 0; i < dots.length; i++) {
        dots[i].update()
    }
}
animate()