const canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext("2d");

function Circle(x, y, dx, dy, rad) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rad = rad;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    c.strokeStyle = "green";
    c.fill();
    c.fillStyle = 'blue';
    c.stroke();
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
    this.draw();
  }
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
  var rad = 5 + (Math.random() * 15);
  var x = Math.random() * (innerWidth - rad * 2) + rad;
  var y = Math.random() * (innerHeight - rad * 2) + rad;
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;
  circleArray.push(new Circle(x, y, dx, dy, rad))

}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}
animate();
