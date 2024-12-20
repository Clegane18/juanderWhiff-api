const comparisonService = require("../../services/ai-chatbot/comparisonService");

const compareOgAndLocalPerfumes = async (req, res) => {
  const result = await comparisonService.compareOgAndLocalPerfumes({
    localPerfumeId: req.body.localPerfumeId,
    ogPerfumeId: req.body.ogPerfumeId,
    comparisonDescription: req.body.comparisonDescription,
  });
  return res.status(result.status).json(result.data);
};

const getAllComparisons = async (req, res) => {
  const result = await comparisonService.getAllComparisons();
  return res.status(result.status).json(result.data);
};

const getComparisonByID = async (req, res) => {
  const result = await comparisonService.getComparisonByID({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

const updateComparison = async (req, res) => {
  const result = await comparisonService.updateComparison({
    id: req.params.id,
    originalPerfumeId: req.body.originalPerfumeId,
    comparisonDescription: req.body.comparisonDescription,
    similarityScore: req.body.similarityScore,
  });
  return res.status(result.status).json(result.data);
};

const deleteComparisonById = async (req, res) => {
  const result = await comparisonService.deleteComparisonById({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

module.exports = {
  compareOgAndLocalPerfumes,
  getAllComparisons,
  getComparisonByID,
  updateComparison,
  deleteComparisonById,
};
