const canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
})

var maxRad = 40;
var minRad = 5;

var colorArray = [
  '#2c3e50',
  '#e74c3c',
  '#ecf0f1',
  '#3498db',
  '#298089'
]

function Circle(x, y, dx, dy, rad) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rad = rad;
  this.minRad = rad;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

  }
  this.update = function () {
    if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.rad < maxRad) {
        this.rad += 1;

      }
    } else if (this.rad > this.minRad) {
      this.rad -= 1;
    }

    this.draw();
  }
}

var circleArray = [];
function init() {

  circleArray = [];
  for (var i = 0; i < 2000; i++) {
    var rad = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - rad * 2) + rad;
    var y = Math.random() * (innerHeight - rad * 2) + rad;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, rad))

  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}
init();
animate();

