import './canvas.js';
import { Node } from "./node.js";

// Initialize the editor.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Create grid of 100x100 nodes.
for (let x = 0; x < 31; x++) {
  for (let y = 0; y < 31; y++) {
    const node = new Node(x * 500, y * 500);
  }
  await sleep(100);
}