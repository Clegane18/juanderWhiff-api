const express = require("express");
const router = express.Router();
const ownerController = require("../../controllers/ai-chatbot/ownerController");
const {
  validateAddOwner,
  validateID,
} = require("../../middlewares/validators/aiChatbotValidators");

router.post("/", validateAddOwner, ownerController.addOwner);

router.get("/", ownerController.getAllOwners);

router.get("/:id", validateID, ownerController.getOwnerById);

module.exports = router;
