import { transform } from "./canvas.js";
import { hook, h, Text, hookRef } from "./utils.js";

let __LAST_ID__ = 0;
const drag = { node: undefined, x: 0, y: 0 };

const canvas = document.querySelector("#canvas");

export class Node {
  #element = document.createElement('node');

  constructor(x, y) {
    this.id = __LAST_ID__++;
    this.#element.setAttribute('data-node', this.id);
    this.x = x;
    this.y = y;
    
    hookRef(this.#element, 'mousedown', (e) => {
      drag.node = this;
      drag.x = (e.clientX - transform.x) - drag.node.x * transform.zoom;
      drag.y = (e.clientY - transform.y) - drag.node.y * transform.zoom;
    });

    canvas.appendChild(this.#element);

    this.render = this.render.bind(this);

    this.#element.style.left = this.x + 'px';
    this.#element.style.top = this.y + 'px';
    this.#element.innerHTML = this.render().outerHTML;
    const style = globalThis.getComputedStyle(this.#element.children[0]);
    this.#element.style.containIntrinsicBlockSize = `${style.width} ${style.height}`;
  }

  render() {
    return h('div', {}, 'transform overflow-hidden rounded-lg bg-white text-left shadow-xl border transition-all w-96', [
      h('div', {}, 'bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4', [
        h('div', {}, 'sm:flex sm:items-start', [
          h('div', {}, 'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10', [
            h('svg', { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor', 'aria-hidden': 'true' }, [
              h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' })
            ])
          ]),
          h('div', {}, 'mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left', [
            h('h3', { id: 'modal-title' }, 'text-base font-semibold leading-6 text-gray-900', [
              Text('Deactivate account')
            ]),
            h('div', {}, 'mt-2', [
              h('p', {}, 'text-sm text-gray-500', [
                Text('Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.')
              ])
            ])
          ])
        ])
      ]),
      h('div', {}, 'bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6', [
        h('button', {}, 'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto', [
          Text('Deactivate')
        ]),
        h('button', {}, 'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto', [
          Text('Cancel')
        ])
      ])
    ]);
  }
}

hook('mousemove', (e) => {
  const { node, x, y } = drag;
  if (!node || !node.element) return;
  node.x = (e.clientX - x - transform.x) / transform.zoom;
  node.y = (e.clientY - y - transform.y) / transform.zoom;
  node.element.style.left = node.x + 'px';
  node.element.style.top = node.y + 'px';
});

hook('mouseup', () => {
  drag.node = undefined;
});

hook('blur', () => {
  drag.node = undefined;
});
