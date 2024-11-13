const express = require("express");
const router = express.Router();
const perfumeController = require("../../controllers/ai-chatbot/perfumeController");
const {
  validateAddPerfume,
  validateID,
  validateUpdatePerfume,
} = require("../../middlewares/validators/aiChatbotValidators");

router
  .post("/", validateAddPerfume, perfumeController.addPerfume)
  .get("/", perfumeController.getAllPerfumes);

router
  .get("/:id", validateID, perfumeController.getPerfumeById)
  .put("/:id", validateUpdatePerfume, perfumeController.updatePerfume);

module.exports = router;
