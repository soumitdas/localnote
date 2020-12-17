import Component from "../core/component";
import { createElement } from "../core/elements";
import { dateToMonDDYYYYHHMMAP } from "../helpers/date";
import { deleteById, getNoteById } from "../helpers/localstorage";

export default class NoteView extends Component {
  constructor(props, children) {
    super(props, children);
    if (this.props.router?.params) {
      this.state = { note: getNoteById(this.props.router?.params?.noteId) };
      console.log(this.props.router?.params?.noteId);
    } else {
      this.state = { note: null };
    }
  }

  handleEdit = () => {
    if (!this.state.note) return;
    this.props.router.push(`/edit-notes/${this.state.note.id}`);
  };

  handleDelete = () => {
    if (!this.state.note) return;
    const ask = confirm(`Are you sure to delete "${this.state.note.title}"`);
    if (!ask) return;
    deleteById(this.state.note.id);
    this.setState({
      ...this.state,
      note: null,
    });
  };

  render() {
    return createElement(
      "div",
      { className: "container" },
      this.state.note
        ? [
            createElement("a", {
              href: "/",
              innerText: "Back to Home",
              onclick: (e) => {
                e.preventDefault();
                this.props.router.push("/");
              },
            }),
            createElement("p", {
              className: "is-date",
              innerText: dateToMonDDYYYYHHMMAP(this.state.note.createdAt),
            }),
            createElement("h2", { innerText: this.state.note.title }),
            createElement("p", {
              innerText: this.state.note.content,
            }),
            createElement(
              "div",
              { className: "tags" },
              this.state.note?.tags instanceof Array &&
                this.state.note.tags.map(
                  (tag) =>
                    tag && createElement("a", { href: "#", innerText: tag })
                )
            ),
            createElement("div", { className: "buttons" }, [
              createElement("button", {
                className: "button",
                innerText: "Edit",
                onclick: this.handleEdit,
              }),
              createElement("button", {
                className: "button",
                innerText: "Delete",
                onclick: this.handleDelete,
              }),
            ]),
          ]
        : [
            createElement("a", {
              href: "/",
              innerText: "Back to Home",
              onclick: (e) => {
                e.preventDefault();
                this.props.router.push("/");
              },
            }),
            createElement("h2", {
              className: "title",
              innerText: "Note not Found",
            }),
          ]
    );
  }
}
