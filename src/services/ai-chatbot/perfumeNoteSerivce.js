const { PerfumeNote, Perfume, Note } = require("../../database/models/index");

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
            message: "Note with ID does not exist.",
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
        newPerfumeNote: addedNotes,
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

const getAllPerfumeNotes = async () => {
  try {
    const perfumeNotes = await PerfumeNote.findAll({
      include: [
        {
          model: Perfume,
          attributes: ["id", "name"],
        },
        {
          model: Note,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["noteType"],
    });

    if (!perfumeNotes || perfumeNotes.length === 0) {
      return {
        status: 404,
        data: {
          message: "No perfume notes found.",
        },
      };
    }

    const perfumeMap = {};

    perfumeNotes.forEach((note) => {
      const { noteType, Perfume, Note } = note;

      if (!perfumeMap[Perfume.id]) {
        perfumeMap[Perfume.id] = {
          Perfume: {
            id: Perfume.id,
            name: Perfume.name,
          },
          TopNotes: [],
          MiddleNotes: [],
          BaseNotes: [],
        };
      }

      if (noteType === "Top") {
        perfumeMap[Perfume.id].TopNotes.push(Note);
      } else if (noteType === "Middle") {
        perfumeMap[Perfume.id].MiddleNotes.push(Note);
      } else if (noteType === "Base") {
        perfumeMap[Perfume.id].BaseNotes.push(Note);
      }
    });

    const structuredPerfumeNotes = Object.values(perfumeMap);

    return {
      status: 200,
      data: {
        message: "All perfume notes retrieved successfully.",
        perfumeNotes: structuredPerfumeNotes,
      },
    };
  } catch (error) {
    console.error("Error in getAllPerfumeNotes service:", error);
    return {
      status: 500,
      data: {
        message: "An error occurred while fetching perfume notes.",
      },
    };
  }
};

const getPerfumeNoteById = async ({ id }) => {
  try {
    const perfumeNotes = await PerfumeNote.findAll({
      where: { perfumeId: id },
      include: [
        {
          model: Perfume,
          attributes: ["id", "name"],
        },
        {
          model: Note,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["noteType"],
    });

    if (!perfumeNotes || perfumeNotes.length === 0) {
      return {
        status: 404,
        data: {
          message: "No perfume notes found.",
        },
      };
    }

    const perfumeResponse = {
      Perfume: {
        id: perfumeNotes[0].Perfume.id,
        name: perfumeNotes[0].Perfume.name,
      },
      TopNotes: [],
      MiddleNotes: [],
      BaseNotes: [],
    };

    perfumeNotes.forEach((note) => {
      const { noteType, Note } = note;

      if (noteType === "Top") {
        perfumeResponse.TopNotes.push(Note);
      } else if (noteType === "Middle") {
        perfumeResponse.MiddleNotes.push(Note);
      } else if (noteType === "Base") {
        perfumeResponse.BaseNotes.push(Note);
      }
    });

    return {
      status: 200,
      data: {
        message: "Perfume notes retrieved successfully.",
        perfume: perfumeResponse,
      },
    };
  } catch (error) {
    console.error("Error in getPerfumeNoteById service:", error);
    return {
      status: 500,
      data: {
        message: "An error occurred while fetching perfume notes.",
      },
    };
  }
};

const updatePerfumeNotes = async ({ perfumeId, noteIds, noteType }) => {
  try {
    const existingPerfume = await Perfume.findByPk(perfumeId);
    if (!existingPerfume) {
      return {
        status: 404,
        data: { message: "Perfume does not exist." },
      };
    }

    const existingPerfumeNotes = await PerfumeNote.findAll({
      where: { perfumeId },
    });
    const existingNoteIds = existingPerfumeNotes.map((note) => note.noteId);

    const notesToRemove = existingPerfumeNotes.filter(
      (note) => !noteIds.includes(note.noteId)
    );
    const notesToAddOrUpdate = noteIds.filter(
      (noteId) => !existingNoteIds.includes(noteId)
    );

    for (const note of notesToRemove) {
      await note.destroy();
    }

    const updatedNotes = [];

    for (const noteId of noteIds) {
      const existingNote = await Note.findByPk(noteId);
      if (!existingNote) {
        return {
          status: 404,
          data: { message: `Note with ID ${noteId} does not exist.` },
        };
      }

      if (existingNoteIds.includes(noteId)) {
        const existingPerfumeNote = await PerfumeNote.findOne({
          where: { perfumeId, noteId },
        });

        if (existingPerfumeNote && existingPerfumeNote.noteType !== noteType) {
          await existingPerfumeNote.update({ noteType });
          updatedNotes.push(existingPerfumeNote);
        }
      }

      if (notesToAddOrUpdate.includes(noteId)) {
        const newPerfumeNote = await PerfumeNote.create({
          perfumeId,
          noteId,
          noteType,
        });
        updatedNotes.push(newPerfumeNote);
      }
    }

    return {
      status: 200,
      data: {
        message: "Perfume notes updated successfully.",
        updateNotes: updatedNotes,
      },
    };
  } catch (error) {
    console.error("Error in updatePerfumeNotes service:", error);
    return {
      status: 500,
      data: { message: "Failed to update perfume notes." },
    };
  }
};

module.exports = {
  addPerfumeNotes,
  getAllPerfumeNotes,
  getPerfumeNoteById,
  updatePerfumeNotes,
};
