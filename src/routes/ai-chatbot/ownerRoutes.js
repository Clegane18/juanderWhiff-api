const express = require("express");
const router = express.Router();
const ownerController = require("../../controllers/ai-chatbot/ownerController");
const {
  validateAddOwner,
  validateID,
  validateUpdateOwner,
} = require("../../middlewares/validators/aiChatbotValidators");

router
  .post("/", validateAddOwner, ownerController.addOwner)
  .get("/", ownerController.getAllOwners);

router
  .get("/:id", validateID, ownerController.getOwnerById)
  .put("/:id", validateUpdateOwner, ownerController.updateOwnerById)
  .delete("/:id", deleteOwnerById, ownerController.deleteOwnerById);

module.exports = router;
