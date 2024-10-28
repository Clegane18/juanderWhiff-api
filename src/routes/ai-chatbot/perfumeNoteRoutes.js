const express = require("express");
const router = express.Router();
const perfumeNoteController = require("../../controllers/ai-chatbot/perfumeNoteController");
const {
  validateAddPerfumeNote,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/:perfumeId",
  validateAddPerfumeNote,
  perfumeNoteController.addPerfumeNotes
);

module.exports = router;
