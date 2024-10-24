const express = require("express");
const router = express.Router();
const perfumeController = require("../../controllers/ai-chatbot/perfumeController");
const {
  validateAddPerfume,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddPerfume, perfumeController.addPerfume);

module.exports = router;
