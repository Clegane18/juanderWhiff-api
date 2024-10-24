const express = require("express");
const router = express.Router();
const ownerController = require("../../controllers/ai-chatbot/ownerController");
const {
  validateAddOwner,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddOwner, ownerController.addOwner);

module.exports = router;
