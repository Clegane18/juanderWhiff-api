const express = require("express");
const router = express.Router();
const perfumeNoteController = require("../../controllers/ai-chatbot/perfumeNoteController");
const {
  validatePerfumeNote,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/:perfumeId",
  validatePerfumeNote,
  perfumeNoteController.addPerfumeNotes
);

router.get("/", perfumeNoteController.getAllPerfumeNotes);

router.get("/:id", validateID, perfumeNoteController.getPerfumeNoteById);

router.put(
  "/:perfumeId",
  validatePerfumeNote,
  perfumeNoteController.updatePerfumeNotes
);
module.exports = router;
