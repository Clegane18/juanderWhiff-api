const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/ai-chatbot/brandController");
const {
  validateAddBrand,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/:ownerId", validateAddBrand, brandController.addBrand);

router.get("/", brandController.getAllBrand);

router.get("/:id", validateID, brandController.getBrandsByOwnerId);

module.exports = router;
