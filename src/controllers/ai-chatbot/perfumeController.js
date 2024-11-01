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

module.exports = { addPerfume };
