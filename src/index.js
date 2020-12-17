import { renderToDOM } from "./core/dom";
import Router from "./core/router";
import CreateOrEditView from "./views/CreateOrEdit";
import HomeView from "./views/Home";
import NoteView from "./views/Note";
import PageNotFound from "./views/PageNotFound";

const rootElement = document.getElementById("app");

const router = new Router();

// routes
router.on("/", () => renderToDOM(new HomeView({ router }), rootElement));
router.on("/notes/:noteId", () =>
  renderToDOM(new NoteView({ router }), rootElement)
);
router.on("/edit-notes/:noteId", () =>
  renderToDOM(new CreateOrEditView({ router }), rootElement)
);
// for page not found
router.default(() => renderToDOM(new PageNotFound({ router }), rootElement));
