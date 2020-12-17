import Component from "../core/component";
import { createElement } from "../core/elements";

export default class PageNotFound extends Component {
  render() {
    return createElement(
      "section",
      { className: "container is-text-centered" },
      [
        createElement("h2", {
          className: "title",
          innerText: "Page Not Found",
        }),
        createElement("button", {
          className: "button",
          innerText: "Back to Home",
          onclick: () => this.props.router.push("/"),
        }),
      ]
    );
  }
}
