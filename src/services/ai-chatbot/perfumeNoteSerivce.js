const PerfumeNote = require("../../database/models/ai-chatbot/perfumeNoteModel");
const Perfume = require("../../database/models/ai-chatbot/perfumeModel");
const Note = require("../../database/models/ai-chatbot/noteModel");

const addPerfumeNotes = async ({ perfumeId, noteIds, noteType }) => {
  try {
    const existingPerfume = await Perfume.findByPk(perfumeId);
    if (!existingPerfume) {
      return {
        status: 404,
        data: {
          message: "Perfume does not exist.",
        },
      };
    }

    const addedNotes = [];
    for (const noteId of noteIds) {
      const existingNote = await Note.findByPk(noteId);
      if (!existingNote) {
        return {
          status: 404,
          data: {
            message: `Note with ID ${noteId} does not exist.`,
          },
        };
      }

      const existingPerfumeNote = await PerfumeNote.findOne({
        where: { perfumeId, noteId, noteType },
      });
      if (existingPerfumeNote) {
        continue;
      }

      const newPerfumeNote = await PerfumeNote.create({
        perfumeId,
        noteId,
        noteType,
      });

      addedNotes.push(newPerfumeNote);
    }

    return {
      status: 201,
      data: {
        message: "Perfume notes added successfully.",
        addedNotes,
      },
    };
  } catch (error) {
    console.error("Error in addPerfumeNotes service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add perfume notes.",
      },
    };
  }
};

module.exports = { addPerfumeNotes };
