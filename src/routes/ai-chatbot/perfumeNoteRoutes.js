const express = require("express");
const router = express.Router();
const perfumeNoteController = require("../../controllers/ai-chatbot/perfumeNoteController");
const {
  validatePerfumeNote,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.get("/", perfumeNoteController.getAllPerfumeNotes);

router
  .post("/:id", validatePerfumeNote, perfumeNoteController.addPerfumeNotes)
  .get("/:id", validateID, perfumeNoteController.getPerfumeNoteById)
  .put("/:id", validatePerfumeNote, perfumeNoteController.updatePerfumeNotes);

module.exports = router;
