const Note = require("../../database/models/ai-chatbot/noteModel");

const addNote = async ({ fragranceNote }) => {
  try {
    const existingFragranceNote = await Note.findOne({
      where: {
        name: fragranceNote,
      },
    });

    if (existingFragranceNote) {
      return {
        status: 400,
        data: {
          message: "Fragrance note already exist.",
        },
      };
    }

    const newFragranceNote = await Note.create({
      name: fragranceNote,
    });

    return {
      status: 201,
      data: {
        message: "Note added successfully",
        note: newFragranceNote,
      },
    };
  } catch (error) {
    console.error("Error in addaddNote service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add note",
      },
    };
  }
};

const getAllNotes = async () => {
  try {
    const notes = await Note.findAll({
      order: [["id", "ASC"]],
    });

    if (notes.length === 0) {
      return {
        status: 404,
        data: { message: "No notes found." },
      };
    }

    return {
      status: 200,
      data: {
        message: "All notes fetched successfully.",
        allNotes: notes,
      },
    };
  } catch (error) {
    console.error("Error in getAllNotes service:", error);
    throw {
      status: 500,
      message: "Error retrieving notes",
    };
  }
};

const getNoteById = async ({ id }) => {
  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return {
        status: 404,
        data: { message: `Note with id ${id} not found.` },
      };
    }

    return {
      status: 200,
      data: {
        message: "Note fetched successfully.",
        note: note,
      },
    };
  } catch (error) {
    console.error("Error in getNoteById service:", error);
    throw {
      status: 500,
      message: "Error retrieving note",
    };
  }
};

module.exports = { addNote, getAllNotes, getNoteById };
