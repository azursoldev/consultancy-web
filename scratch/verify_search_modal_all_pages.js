const fs = require('fs');
const http = require('http');
const assert = require('assert');
const vm = require('vm');

console.log('--- Verifying Search Modal Injection on All Pages ---');

// Read header.js
const headerCode = fs.readFileSync('js/header.js', 'utf8');
assert(headerCode.includes('id="siteSearchModal"'), 'header.js must include siteSearchModal in headerHTML');
assert(headerCode.includes('openSiteSearchModal'), 'header.js must define openSiteSearchModal');
assert(headerCode.includes('closeSiteSearchModal'), 'header.js must define closeSiteSearchModal');

// Test with mock DOM simulation
function createMockDOM() {
  const elements = {};
  const bodyListeners = {};
  const docListeners = {};

  const document = {
    readyState: 'complete',
    body: {
      style: {},
      appendChild(el) { elements[el.id] = el; return el; },
      insertAdjacentHTML(pos, html) {
        if (html.includes('id="siteSearchModal"')) {
          elements['siteSearchModal'] = {
            id: 'siteSearchModal',
            classList: {
              classes: new Set(['search-modal-overlay']),
              add(c) { this.classes.add(c); },
              remove(c) { this.classes.delete(c); },
              contains(c) { return this.classes.has(c); }
            },
            querySelector(sel) { return null; }
          };
        }
      }
    },
    getElementById(id) {
      return elements[id] || null;
    },
    querySelector(sel) {
      return null;
    },
    querySelectorAll(sel) {
      const res = [];
      for (const k in elements) {
        res.push(elements[k]);
      }
      return res;
    },
    addEventListener(evt, fn) {
      docListeners[evt] = fn;
    },
    createElement(tag) {
      return {
        tagName: tag,
        id: '',
        className: '',
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        style: {},
        innerHTML: '',
        querySelector() { return null; }
      };
    }
  };

  const window = {
    location: { pathname: '/about.html' },
    addEventListener(evt, fn) {},
    document: document
  };

  return { window, document };
}

const mock = createMockDOM();
const ctx = vm.createContext({
  window: mock.window,
  document: mock.document,
  location: mock.window.location,
  setTimeout: fn => fn()
});

vm.runInContext(headerCode, ctx);

assert(typeof ctx.window.openSearchModal === 'function', 'openSearchModal must be a function');
assert(typeof ctx.window.closeSearchModal === 'function', 'closeSearchModal must be a function');

console.log('Testing openSearchModal on /about.html:');
ctx.window.openSearchModal();
const modal = ctx.document.getElementById('siteSearchModal');
assert(modal !== null, 'siteSearchModal must exist in document');
assert(modal.classList.contains('open'), 'siteSearchModal must have open class');
console.log('✓ Modal opened successfully on inner page');

ctx.window.closeSearchModal();
assert(!modal.classList.contains('open'), 'siteSearchModal must not have open class after close');
console.log('✓ Modal closed successfully on inner page');

console.log('\nALL SEARCH MODAL INTEGRATION TESTS PASSED!');
