const express = require("express");
const router = express.Router();
const perfumeNoteController = require("../../controllers/ai-chatbot/perfumeNoteController");
const {
  validateAddPerfumeNote,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/:perfumeId",
  validateAddPerfumeNote,
  perfumeNoteController.addPerfumeNotes
);

router.get("/", perfumeNoteController.getAllPerfumeNotes);

router.get("/:id", validateID, perfumeNoteController.getPerfumeNoteById);

module.exports = router;
