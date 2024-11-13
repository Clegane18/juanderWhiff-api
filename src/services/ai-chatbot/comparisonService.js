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
          message: "Local perfume was not found.",
        },
      };
    }

    const originalPerfume = await Perfume.findByPk(ogPerfumeId);

    if (!originalPerfume) {
      return {
        status: 404,
        data: {
          message: "OG perfume was not found.",
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
        comparison: newComparison,
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
        allComparisons: comparisons,
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
          message: "Comparison not found.",
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "Comparison fetched successfully",
        comparison: comparison,
      },
    };
  } catch (error) {
    console.error("Error fetching comparison:", error);
    return {
      status: 500,
      data: {
        message: "Failed to fetch comparison",
      },
    };
  }
};

const updateComparison = async ({
  id,
  originalPerfumeId,
  comparisonDescription,
  similarityScore,
}) => {
  try {
    const comparison = await Comparison.findByPk(id);

    if (!comparison) {
      return {
        status: 404,
        data: { message: "Comparison not found." },
      };
    }
    if (originalPerfumeId !== undefined && originalPerfumeId !== null) {
      const originalPerfume = await Perfume.findByPk(originalPerfumeId);
      if (!originalPerfume) {
        return {
          status: 404,
          data: { message: "Original perfume not found." },
        };
      }
    }

    const fields = {
      originalPerfumeId,
      comparisonDescription,
      similarityScore,
    };
    const updates = Object.keys(fields).reduce((acc, key) => {
      if (fields[key] !== undefined && fields[key] !== null) {
        acc[key] =
          typeof fields[key] === "string" ? fields[key].trim() : fields[key];
      }
      return acc;
    }, {});

    if (Object.keys(updates).length === 0) {
      return {
        status: 400,
        data: { message: "No updates provided." },
      };
    }

    await comparison.update(updates);

    return {
      status: 200,
      data: {
        message: "Comparison updated successfully",
        updatedInfo: comparison,
      },
    };
  } catch (error) {
    console.error("Error in updateComparison service:", error);
    return {
      status: 500,
      data: { message: "An error occurred while updating the comparison." },
    };
  }
};

const deleteComparisonById = async ({ id }) => {
  try {
    const comparison = await Comparison.findByPk(id, {
      include: [
        { model: Perfume, as: "Perfume" },
        { model: Perfume, as: "OriginalPerfume" },
      ],
    });

    if (!comparison) {
      return {
        status: 404,
        data: { message: "Comparison not found" },
      };
    }

    if (comparison.Perfume || comparison.OriginalPerfume) {
      return {
        status: 400,
        data: { message: "Cannot delete comparison with linked perfumes" },
      };
    }

    await comparison.destroy();

    return {
      status: 200,
      data: { message: "Comparison deleted successfully" },
    };
  } catch (error) {
    console.error("Error deleting comparison:", error);
    return {
      status: 500,
      data: { message: "An error occurred while deleting the comparison" },
    };
  }
};

module.exports = {
  compareOgAndLocalPerfumes,
  getAllComparisons,
  getComparisonByID,
  updateComparison,
  deleteComparisonById,
};
