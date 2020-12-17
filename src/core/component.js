export default class Component {
  constructor(props, children) {
    this.props = props;
    this.children = children;
    if (this.children) {
      this.children.onUpdate(() => this.handler());
    }
  }

  setState(value) {
    if (!this.state) return;
    if (!(value instanceof Object)) return;
    this.state = value;
    if (this.handler instanceof Function) this.handler();
  }

  onUpdate(handler) {
    this.handler = handler;
  }

  render() {
    return;
  }
}
