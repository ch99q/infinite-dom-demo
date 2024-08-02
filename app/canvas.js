import { hook, clamp } from './utils.js';

export const transform = { x: 0, y: 0, zoom: 1 };

hook("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    const { x: left, y: top } = transform;
    const zoom = clamp(transform.zoom * Math.pow(2, -Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.025, 0.5)), 0.05, 3);
    transform.x -= ((e.clientX - left + globalThis.scrollX) / transform.zoom) * (zoom - transform.zoom);;
    transform.y -= ((e.clientY - top + globalThis.scrollY) / transform.zoom) * (zoom - transform.zoom);
    transform.zoom = zoom;
  }
  else {
    transform.x -= e.deltaX;
    transform.y -= e.deltaY;
  }
  requestAnimationFrame(render);
},
  { passive: false },
);

const canvas = document.querySelector("#canvas");
const debug = document.querySelector("#debug");

function render() {
  canvas.style.transform = `matrix3d(${transform.zoom}, 0, 0, 0, 0, ${transform.zoom}, 0, 0, 0, 0, 1, 0, ${transform.x}, ${transform.y}, 0, 1)`;
  debug.innerText = `x: ${transform.x.toFixed(2)}, y: ${transform.y.toFixed(2)}, zoom: ${transform.zoom.toFixed(2)}, elements: ${document.getElementsByTagName('*').length}`;
}

requestAnimationFrame(render);