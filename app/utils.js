export const attr = (el, name) => parseFloat(el.getAttribute(name));
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const hook = (event, callback, options) => {
  const handler = (e) => callback(e);
  globalThis.addEventListener(event, handler, options);
  return () => globalThis.removeEventListener(event, handler);
};

export const hookRef = (ref, event, callback, options) => {
  const handler = (e) => callback(ref, e);
  ref.addEventListener(event, handler, options);
  return () => ref.removeEventListener(event, handler);
};

export const h = (tag, attrs = {}, clazz = "", children = [], callback) => {
  const el = document.createElement(tag);
  if (clazz !== "")
    attrs["class"] = clazz;
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (Array.isArray(children)) {
    el.append(...children);
  } else {
    if (typeof children === "string") {
      children = document.createTextNode(children);
    }
    el.append(children);
  }
  callback && el.append(...callback(el));
  return el;
};

export const Text = (value, clazz) => h("span", {}, clazz, value);
export const Box = (attrs, children) => h("div", attrs, "flex", children);
export const HStack = (attrs, children) => h("div", attrs, "flex flex-row", children);
export const VStack = (attrs, children) => h("div", attrs, "flex flex-col", children);