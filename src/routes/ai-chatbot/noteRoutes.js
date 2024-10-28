const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/ai-chatbot/noteController");
const {
  validateAddNote,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddNote, noteController.addNote);

module.exports = router;
