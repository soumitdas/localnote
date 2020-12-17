import Component from "../core/component";
import { createElement } from "../core/elements";
import { dateToMonDDYYYYHHMMAP } from "../helpers/date";
import { getNotes, deleteById } from "../helpers/localstorage";

export default class HomeView extends Component {
  state = {
    notes: getNotes() instanceof Array ? getNotes() : [],
    deleteSuccessMessage: "",
  };

  handleEdit = (id) => {
    if (!id) return;
    this.props.router.push(`/edit-notes/${id}`);
  };

  handleDelete = ({ id, title }) => {
    if (!id) return;
    const ask = confirm(`Are you sure to delete "${title}"`);
    if (!ask) return;
    const newNotes = deleteById(id);
    setTimeout(() => {
      this.setState({ ...this.state, deleteSuccessMessage: "" });
    }, 2000);
    this.setState({
      ...this.state,
      notes: newNotes,
      deleteSuccessMessage: `Note titled "${title}" deleted`,
    });
  };

  render() {
    return createElement("div", null, [
      createElement("section", { className: "hero-center" }, [
        createElement("button", {
          className: "button",
          innerText: "Create New",
          onclick: () => this.props.router.push("/edit-notes/new"),
        }),
      ]),
      this.state.deleteSuccessMessage &&
        createElement("p", {
          className: "notification-danger is-text-centered",
          innerText: this.state.deleteSuccessMessage,
        }),
      createElement("h2", { className: "title", innerText: "All your Notes" }),
      this.state.notes.length > 0
        ? createElement(
            "section",
            { className: "card-list" },
            this.state.notes.map((note) =>
              createElement("article", { className: "card" }, [
                createElement("header", { className: "card-header" }, [
                  createElement("p", {
                    innerText: dateToMonDDYYYYHHMMAP(note.createdAt),
                  }),
                  createElement("h2", {
                    innerText: note.title,
                    onclick: () => this.props.router.push(`/notes/${note.id}`),
                  }),
                ]),
                createElement("div", { className: "card-content" }, [
                  createElement("p", {
                    innerText: note.content,
                  }),
                ]),
                createElement(
                  "div",
                  { className: "tags" },
                  note.tags instanceof Array &&
                    note.tags.map(
                      (tag) =>
                        tag && createElement("a", { href: "#", innerText: tag })
                    )
                ),
                createElement("div", { className: "buttons" }, [
                  createElement("button", {
                    className: "button",
                    innerText: "Edit",
                    onclick: () => this.handleEdit(note.id),
                  }),
                  createElement("button", {
                    className: "button",
                    innerText: "Delete",
                    onclick: () => this.handleDelete(note),
                  }),
                ]),
              ])
            )
          )
        : createElement("p", {
            className: "notification-danger is-text-centered",
            innerText: "No notes found",
          }),
    ]);
  }
}
