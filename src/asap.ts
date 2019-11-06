export let isUsingMicroTask = false;

let pending = false;

const callbacks = [];

function flushCalblacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timerFunc;

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCalblacks);
  };
  isUsingMicroTask = true;
} else if (typeof MutationObserver !== 'undefined') {
  let counter = 1;
  const observer = new MutationObserver(flushCalblacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
} else {
  setTimeout(flushCalblacks, 0);
}
export function asap(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        throw e;
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve) => {
        _resolve = resolve;
      });
    }
  });
}
