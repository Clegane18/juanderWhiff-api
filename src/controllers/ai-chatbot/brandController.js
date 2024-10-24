const brandService = require("../../services/ai-chatbot/brandService");

const addBrand = async (req, res) => {
  const result = await brandService.addBrand({
    ownerId: req.params.ownerId,
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    website: req.body.website,
    logoUrl: req.body.logoUrl,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addBrand };
