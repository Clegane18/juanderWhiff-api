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

module.exports = { addNote };
