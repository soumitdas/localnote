export const createNote = ({ title, content, tags = "" }) => {
  const prevNotes = getNotes();
  if (typeof tags !== "string") {
    throw new Error("`tags` should be string");
  }
  const note = {
    id: Date.now(),
    title,
    content,
    tags: tags.split(/[ ,]+/),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  console.log(note);
  localStorage.setItem("__notes", JSON.stringify([...prevNotes, note]));
};

export const getNotes = () => {
  if (!localStorage.getItem("__notes")) return [];
  try {
    return JSON.parse(localStorage.getItem("__notes"));
  } catch {
    return [];
  }
};

export const getNoteById = (id) => {
  const notes = getNotes();
  return notes.find((note) => note.id == id);
};

export const deleteById = (id) => {
  const notes = getNotes();
  const index = notes.findIndex((note) => note.id == id);
  if (index > -1) {
    notes.splice(index, 1);
    localStorage.setItem("__notes", JSON.stringify(notes));
  }
  return notes;
};

export const editNoteById = (id, data) => {
  if (typeof data.tags !== "string") {
    throw new Error("`tags` should be string");
  }
  data.tags = data.tags.split(/[ ,]+/);
  const notes = getNotes();
  const index = notes.findIndex((note) => note.id == id);
  if (index > -1) {
    notes[index] = { ...notes[index], ...data };
    localStorage.setItem("__notes", JSON.stringify(notes));
  }
};
