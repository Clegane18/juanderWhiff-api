const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/ai-chatbot/noteController");
const {
  validateAddNote,
  validateGetNoteByID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddNote, noteController.addNote);

router.get("/", noteController.getAllNotes);

router.get("/:noteID", validateGetNoteByID, noteController.getNoteById);

module.exports = router;
