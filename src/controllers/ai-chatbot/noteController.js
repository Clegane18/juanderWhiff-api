const noteService = require("../../services/ai-chatbot/noteService");

const addNote = async (req, res) => {
  const result = await noteService.addNote({
    fragranceNote: req.body.fragranceNote,
  });
  return res.status(result.status).json(result.data);
};

const getAllNotes = async (req, res) => {
  const result = await noteService.getAllNotes();
  return res.status(result.status).json(result.data);
};

const getNoteById = async (req, res) => {
  const result = await noteService.getNoteById({ noteID: req.params.noteID });
  return res.status(result.status).json(result.data);
};

module.exports = { addNote, getAllNotes, getNoteById };
