import Component from "../core/component";
import { createElement } from "../core/elements";
import { createNote, getNoteById, editNoteById } from "../helpers/localstorage";

export default class CreateOrEditView extends Component {
  constructor(props, children) {
    super(props, children);
    if (this.props.router?.params) {
      this.state = { note: getNoteById(this.props.router?.params?.noteId) };
      //console.log(this.props.router?.params?.noteId);
    } else {
      this.state = { note: null };
    }
  }

  state = {
    ...this.state,
    isEditing: false,
    successMessage: "",
    errorMessage: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      title: e.target.title.value,
      content: e.target.content.value,
      tags: e.target.tags.value,
    };
    try {
      if (this.state.note) {
        // edit
        editNoteById(this.state.note.id, note);
      } else {
        // new
        createNote(note);
      }
      this.setState({
        ...this.state,
        note: null,
        successMessage: "Note saved successfully",
      });
    } catch (e) {
      this.setState({
        ...this.state,
        errorMessage: `Note cannot be saved. Error: ${e.message}`,
      });
    }
  };

  render() {
    return createElement("section", { className: "container" }, [
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
        innerText: `${this.state.note ? "Edit" : "Create new"} Note`,
      }),
      this.state.successMessage
        ? createElement("p", {
            className: "notification-success",
            innerText: this.state.successMessage,
          })
        : this.state.errorMessage &&
          createElement("p", {
            className: "notification-danger",
            innerText: this.state.errorMessage,
          }),
      createElement("form", { onsubmit: this.handleSubmit }, [
        createElement("label", { htmlFor: "title", innerText: "Title" }),
        createElement("input", {
          type: "text",
          name: "title",
          placeholder: "enter title",
          minLength: "2",
          required: true,
          value: this.state.note ? this.state.note.title : "",
        }),
        createElement("label", { htmlFor: "content", innerText: "Content" }),
        createElement("textarea", {
          name: "content",
          minLength: "3",
          required: true,
          value: this.state.note ? this.state.note.content : "",
        }),
        createElement("label", {
          htmlFor: "tags",
          innerText: "Tags",
        }),
        createElement("input", {
          type: "text",
          name: "tags",
          value:
            this.state.note?.tags instanceof Array
              ? this.state.note.tags.join(" ")
              : "",
        }),
        createElement("button", {
          type: "submit",
          className: "button create-new",
          innerText: "Save",
        }),
      ]),
    ]);
  }
}
