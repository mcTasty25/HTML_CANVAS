const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

c.beginPath();
c.moveTo(canvas.width, canvas.height);
for (var i = 0; i < 200; i++) {
  c.lineTo(i, 100);
  c.strokeStyle = "white";
  c.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);
}
animate();
