const comparisonService = require("../../services/ai-chatbot/comparisonService");

const compareOgAndLocalPerfumes = async (req, res) => {
  const result = await comparisonService.compareOgAndLocalPerfumes({
    localPerfumeId: req.body.localPerfumeId,
    ogPerfumeId: req.body.ogPerfumeId,
    comparisonDescription: req.body.comparisonDescription,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { compareOgAndLocalPerfumes };
