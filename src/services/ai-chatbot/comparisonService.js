const Comparison = require("../../database/models/ai-chatbot/comparisonModel");
const Perfume = require("../../database/models/ai-chatbot/perfumeModel");
const calculateSimilarityScore = require("../../utils/calculateSimilarityScore");

const compareOgAndLocalPerfumes = async ({
  localPerfumeId,
  ogPerfumeId,
  comparisonDescription,
}) => {
  try {
    const localPerfume = await Perfume.findByPk(localPerfumeId);

    if (!localPerfume) {
      return {
        status: 404,
        data: {
          message: `Local perfume with ID of ${noteId} was not found.`,
        },
      };
    }

    const originalPerfume = await Perfume.findByPk(ogPerfumeId);

    if (!originalPerfume) {
      return {
        status: 404,
        data: {
          message: `OG perfume with ID of ${noteId} was not found.`,
        },
      };
    }

    const similarityScore = await calculateSimilarityScore(
      localPerfumeId,
      ogPerfumeId
    );
    const comparisonOfLocalToOriginal = comparisonDescription;

    const newComparison = await Comparison.create({
      perfumeId: localPerfumeId,
      originalPerfumeId: ogPerfumeId,
      comparisonDescription: comparisonOfLocalToOriginal,
      similarityScore: similarityScore,
    });

    return {
      status: 201,
      data: {
        message: "New comparison added successfully",
        note: newComparison,
      },
    };
  } catch (error) {
    console.error("Error in compareOgAndLocalPerfumes service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add comparison",
      },
    };
  }
};

module.exports = { compareOgAndLocalPerfumes };
