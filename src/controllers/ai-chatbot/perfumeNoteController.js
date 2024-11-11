const perfumeNoteService = require("../../services/ai-chatbot/perfumeNoteSerivce");

const addPerfumeNotes = async (req, res) => {
  const result = await perfumeNoteService.addPerfumeNotes({
    perfumeId: req.params.perfumeId,
    noteIds: req.body.noteIds,
    noteType: req.body.noteType,
  });
  return res.status(result.status).json(result.data);
};

const getAllPerfumeNotes = async (req, res) => {
  const result = await perfumeNoteService.getAllPerfumeNotes();
  return res.status(result.status).json(result.data);
};

const getPerfumeNoteById = async (req, res) => {
  const result = await perfumeNoteService.getPerfumeNoteById({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

const updatePerfumeNotes = async (req, res) => {
  const result = await perfumeNoteService.updatePerfumeNotes({
    perfumeId: req.params.perfumeId,
    noteIds: req.body.noteIds,
    noteType: req.body.noteType,
  });
  return res.status(result.status).json(result.data);
};

module.exports = {
  addPerfumeNotes,
  getAllPerfumeNotes,
  getPerfumeNoteById,
  updatePerfumeNotes,
};
