const noteService = require("../../services/ai-chatbot/noteService");

const addNote = async (req, res) => {
  const result = await noteService.addNote({
    fragranceNote: req.body.fragranceNote,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addNote };
