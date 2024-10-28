const PerfumeNote = require("../database/models/ai-chatbot/perfumeNoteModel");

const calculateSimilarityScore = async (localPerfumeId, originalPerfumeId) => {
  const localNotes = await PerfumeNote.findAll({
    where: { perfumeId: localPerfumeId },
    attributes: ["noteId"],
  });

  const originalNotes = await PerfumeNote.findAll({
    where: { perfumeId: originalPerfumeId },
    attributes: ["noteId"],
  });

  const localNotesArray = localNotes.map((note) => note.noteId);
  const originalNotesArray = originalNotes.map((note) => note.noteId);

  const setA = new Set(localNotesArray);
  const setB = new Set(originalNotesArray);

  const intersection = [...setA].filter((note) => setB.has(note)).length;

  const similarityScore = Math.round(
    (intersection / Math.max(setA.size, setB.size)) * 100
  );

  return similarityScore;
};

module.exports = calculateSimilarityScore;
