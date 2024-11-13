const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/ai-chatbot/noteController");
const {
  validateAddNote,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router
  .post("/", validateAddNote, noteController.addNote)
  .get("/", noteController.getAllNotes);

router.get("/:id", validateID, noteController.getNoteById);

module.exports = router;
