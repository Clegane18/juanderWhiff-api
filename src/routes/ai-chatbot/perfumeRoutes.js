const express = require("express");
const router = express.Router();
const perfumeController = require("../../controllers/ai-chatbot/perfumeController");
const {
  validateAddPerfume,
  validateID,
  validateUpdatePerfume,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddPerfume, perfumeController.addPerfume);

router.get("/", perfumeController.getAllPerfumes);

router.get("/:id", validateID, perfumeController.getPerfumeById);

router.put(
  "/:perfumeId",
  validateUpdatePerfume,
  perfumeController.updatePerfume
);

module.exports = router;
