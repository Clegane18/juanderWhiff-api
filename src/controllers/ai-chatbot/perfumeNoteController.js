const perfumeNoteService = require("../../services/ai-chatbot/perfumeNoteSerivce");

const addPerfumeNotes = async (req, res) => {
  const result = await perfumeNoteService.addPerfumeNotes({
    perfumeId: req.params.perfumeId,
    noteIds: req.body.noteIds,
    noteType: req.body.noteType,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addPerfumeNotes };
