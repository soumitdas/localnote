export function createElement(elementName, props, childrens) {
  if (typeof props !== "object") {
    throw new Error("`props` should be an object");
  }
  const element = document.createElement(elementName);
  if (props instanceof Object) {
    Object.keys(props).forEach((key) => {
      element[key] = props[key];
    });
  }
  if (childrens instanceof Array) {
    childrens.forEach((children) => {
      if (children instanceof Node) {
        element.appendChild(children);
      }
    });
  }
  return element;
}
