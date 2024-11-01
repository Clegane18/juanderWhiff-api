const express = require("express");
const router = express.Router();
const comparisonController = require("../../controllers/ai-chatbot/comparisonController");
const {
  validateComparePerfumes,
  validateGetComparisonByID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post(
  "/",
  validateComparePerfumes,
  comparisonController.compareOgAndLocalPerfumes
);

router.get("/", comparisonController.getAllComparisons);

router.get(
  "/:id",
  validateGetComparisonByID,
  comparisonController.getComparisonByID
);

module.exports = router;
