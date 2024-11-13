const perfumeService = require("../../services/ai-chatbot/perfumeService");

const addPerfume = async (req, res) => {
  const result = await perfumeService.addPerfume({
    brandId: req.body.brandId,
    originalPerfumeId: req.body.originalPerfumeId,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    smellDescription: req.body.smellDescription,
    releaseDate: req.body.releaseDate,
    comparisonDescription: req.body.comparisonDescription,
    similarityScore: req.body.similarityScore,
    oilConcentration: req.body.oilConcentration,
  });
  return res.status(result.status).json(result.data);
};

const getAllPerfumes = async (req, res) => {
  const result = await perfumeService.getAllPerfumes();
  return res.status(result.status).json(result.data);
};

const getPerfumeById = async (req, res) => {
  const result = await perfumeService.getPerfumeById({ id: req.params.id });
  return res.status(result.status).json(result.data);
};

const updatePerfume = async (req, res) => {
  const result = await perfumeService.updatePerfume({
    id: req.params.id,
    brandId: req.body.brandId,
    originalPerfumeId: req.body.originalPerfumeId,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    smellDescription: req.body.smellDescription,
    releaseDate: req.body.releaseDate,
    comparisonDescription: req.body.comparisonDescription,
    similarityScore: req.body.similarityScore,
    oilConcentration: req.body.oilConcentration,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addPerfume, getAllPerfumes, getPerfumeById, updatePerfume };
