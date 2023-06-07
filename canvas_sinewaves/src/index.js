import * as dat from "../node_modules/dat.gui/build/dat.gui.module.js";

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
const gui = new dat.GUI();

var mouse = {
  x: undefined,
  y: undefined,
};

const wave = {
  y: canvas.height / 2,
  wavelength: 0.02,
  amplitude: 200,
  frequency: 0.01,
};

const strokecolor = {
  h: 360,
  s: 50,
  l: 50,
};
const wavefolder = gui.addFolder("wave");
const strokefolder = gui.addFolder("strokecolor");

wavefolder.add(wave, "y", 0, canvas.height);
wavefolder.add(wave, "wavelength", -0.02, 0.02);
wavefolder.add(wave, "amplitude", -200, 200);
wavefolder.add(wave, "frequency", -0.01, 0.1);
wavefolder.open();

strokefolder.add(strokecolor, "h", 0, 360);
strokefolder.add(strokecolor, "s", 0, 100);
strokefolder.add(strokecolor, "l", 0, 100);

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (var i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y+
        Math.sin(i * (wave.wavelength) + increment) *
          wave.amplitude *
          Math.sin(increment)
    );
  }
  c.strokeStyle = `hsl(${Math.abs(
    strokecolor.h * Math.sin(increment)
  )},${strokecolor.s}%,${strokecolor.l}%)`;
  c.stroke();
  
  increment += wave.frequency;
}
animate();
