const express = require("express");
const router = express.Router();
const comparisonController = require("../../controllers/ai-chatbot/comparisonController");
const {
  validateComparePerfumes,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/",
  validateComparePerfumes,
  comparisonController.compareOgAndLocalPerfumes
);

router.get("/", comparisonController.getAllComparisons);

router.get("/:id", validateID, comparisonController.getComparisonByID);

module.exports = router;
