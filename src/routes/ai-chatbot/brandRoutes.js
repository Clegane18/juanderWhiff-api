const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/ai-chatbot/brandController");
const {
  validateAddBrand,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/:ownerId", validateAddBrand, brandController.addBrand);

module.exports = router;
