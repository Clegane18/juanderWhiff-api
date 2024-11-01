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

const getAllComparisons = async () => {
  try {
    const comparisons = await Comparison.findAll({
      include: [
        {
          model: Perfume,
          as: "Perfume",
          attributes: ["id", "name", "brandId", "smellDescription", "price"],
          include: {
            model: Perfume,
            as: "OriginalPerfume",
            attributes: ["id", "name", "smellDescription", "price"],
          },
        },
        {
          model: Perfume,
          as: "OriginalPerfume",
          attributes: ["id", "name", "smellDescription", "price"],
        },
      ],
    });

    if (comparisons.length === 0) {
      return {
        status: 404,
        data: {
          message: "No comparisons found.",
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "Comparisons fetched successfully",
        data: comparisons,
      },
    };
  } catch (error) {
    console.error("Error fetching comparisons:", error);
    res.status(500).json({
      message: "Failed to fetch comparisons",
    });
  }
};

const getComparisonByID = async ({ id }) => {
  try {
    const comparison = await Comparison.findOne({
      where: { id },
      include: [
        {
          model: Perfume,
          as: "Perfume",
          attributes: ["id", "name", "brandId", "smellDescription", "price"],
          include: {
            model: Perfume,
            as: "OriginalPerfume",
            attributes: ["id", "name", "smellDescription", "price"],
          },
        },
        {
          model: Perfume,
          as: "OriginalPerfume",
          attributes: ["id", "name", "smellDescription", "price"],
        },
      ],
    });

    if (!comparison) {
      return {
        status: 404,
        data: {
          message: `Comparison with ID ${id} not found.`,
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "Comparison fetched successfully",
        data: comparison,
      },
    };
  } catch (error) {
    console.error(`Error fetching comparison with ID ${id}:`, error);
    return {
      status: 500,
      data: {
        message: "Failed to fetch comparison",
      },
    };
  }
};

module.exports = {
  compareOgAndLocalPerfumes,
  getAllComparisons,
  getComparisonByID,
};
