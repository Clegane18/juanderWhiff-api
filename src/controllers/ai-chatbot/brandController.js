const brandService = require("../../services/ai-chatbot/brandService");

const addBrand = async (req, res) => {
  const result = await brandService.addBrand({
    id: req.params.id,
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    website: req.body.website,
    logoUrl: req.body.logoUrl,
  });
  return res.status(result.status).json(result.data);
};

const getAllBrand = async (req, res) => {
  const result = await brandService.getAllBrand();
  return res.status(result.status).json(result.data);
};

const getBrandsByOwnerId = async (req, res) => {
  const result = await brandService.getBrandsByOwnerId({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

const updateBrandId = async (req, res) => {
  const result = await brandService.updateBrandId({
    id: req.params.id,
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    website: req.body.website,
    logoUrl: req.body.logoUrl,
  });
  return res.status(result.status).json(result.data);
};

const deleteBrandById = async (req, res) => {
  const result = await brandService.deleteBrandById({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

module.exports = {
  addBrand,
  getAllBrand,
  getBrandsByOwnerId,
  updateBrandId,
  deleteBrandById,
};
