export function renderToDOM(component, DOMElement) {
  component.onUpdate(listener);
  let child = component.render();
  DOMElement.innerHTML = "";
  DOMElement.appendChild(child);

  function listener() {
    if (child instanceof Node) {
      DOMElement.removeChild(child);
    }
    child = component.render();
    DOMElement.appendChild(child);
  }
}
