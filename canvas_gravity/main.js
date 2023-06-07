const canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const c = canvas.getContext('2d')

var gravity = 1
var friction = 0.95

function randomintfromrange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Ball(x, y, radius, dx, dy) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius

    this.update = function () {
        this.y += this.dy
        this.x += this.dx

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }
        this.draw()
    }

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'white'
        c.fillStyle = 'blue'
        c.fill()
        c.stroke()
        // c.beginPath()
        // c.moveTo(canvas.width/2,canvas.height/4)
        // c.lineTo(this.x,this.y)
        // c.strokeStyle='red'
        // c.stroke()
        c.closePath()

    }
}
var ball
var ballArray = []
function init() {
    //ball = new Ball(100,100,20,2)
    for (var i = 0; i < 50; i++) {
        var radius = randomintfromrange(5, 15)
        var x = randomintfromrange(radius, canvas.width - radius)
        var y = randomintfromrange(1, (canvas.height / 2) - radius)
        var dx = randomintfromrange(-2, 2)
        ballArray.push(new Ball(x, y, radius, dx, 1))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update()
    }
}
init()
animate()