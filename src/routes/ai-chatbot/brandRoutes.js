const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/ai-chatbot/brandController");
const {
  validateAddBrand,
  validateID,
  validateUpdateBrand,
} = require("../../middlewares/validators/aiChatbotValidators");

router.get("/", brandController.getAllBrand);

router
  .post("/:id", validateAddBrand, brandController.addBrand)
  .get("/:id", validateID, brandController.getBrandsByOwnerId)
  .put("/:id", validateUpdateBrand, brandController.updateBrandId)
  .delete("/:id", validateID, brandController.deleteBrandById);

module.exports = router;
