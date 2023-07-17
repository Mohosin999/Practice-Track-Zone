import { action, thunk } from "easy-peasy";
import { generate } from "shortid";

const eventModel = {
  content: "",
  savedContent: "",
  isEditing: false,

  setContent: action((state, value) => {
    state.content = value;
  }),

  setSavedContent: action((state, value) => {
    state.savedContent = value;
  }),

  setIsEditing: action((state, value) => {
    state.isEditing = value;
  }),

  loadSavedContent: thunk(async (actions, id) => {
    if (id) {
      const storedContent = localStorage.getItem(id);
      if (storedContent) {
        actions.setSavedContent(storedContent);
      }
    }
  }),

  saveContent: thunk((actions, { id, content }) => {
    const formattedContent = content.replace(/\n/g, "<br>");
    localStorage.setItem(id, formattedContent);
    actions.setSavedContent(formattedContent);
    actions.setIsEditing(false);
  }),

  deleteContent: thunk((actions, id) => {
    localStorage.removeItem(id);
    actions.setContent("");
    actions.setSavedContent("");
  }),

  editContent: thunk((actions, savedContent) => {
    actions.setContent(savedContent.replace(/<br>/g, "\n"));
    actions.setIsEditing(true);
  }),

  cancelEditing: action((actions) => {
    actions.setIsEditing(false);
  }),

  clearContent: action((actions) => {
    actions.setContent("");
  }),
};

export default eventModel;
