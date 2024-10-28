const express = require("express");
const router = express.Router();
const comparisonController = require("../../controllers/ai-chatbot/comparisonController");
const {
  validateComparePerfumes,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/",
  validateComparePerfumes,
  comparisonController.compareOgAndLocalPerfumes
);

module.exports = router;
