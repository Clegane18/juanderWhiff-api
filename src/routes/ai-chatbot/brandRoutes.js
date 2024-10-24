const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/ai-chatbot/brandController");
const {} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/:ownerId", brandController.addBrand);

module.exports = router;
