const express = require("express");
const router = express.Router();
const comparisonController = require("../../controllers/ai-chatbot/comparisonController");
const {
  validateComparePerfumes,
  validateID,
  validateComparisonBrand,
} = require("../../middlewares/validators/aiChatbotValidators");

router
  .post(
    "/",
    validateComparePerfumes,
    comparisonController.compareOgAndLocalPerfumes
  )
  .get("/", comparisonController.getAllComparisons);

router
  .get("/:id", validateID, comparisonController.getComparisonByID)

  .put("/:id", validateComparisonBrand, comparisonController.updateComparison)

  .delete("/:id", validateID, comparisonController.deleteComparisonById);

module.exports = router;
