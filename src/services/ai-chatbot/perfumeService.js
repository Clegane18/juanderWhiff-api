const Brand = require("../../database/models/ai-chatbot/brandModel");
const Perfume = require("../../database/models/ai-chatbot/perfumeModel");

const addPerfume = async ({
  brandId,
  originalPerfumeId,
  name,
  type,
  description,
  price,
  size,
  smellDescription,
  releaseDate,
  comparisonDescription,
  similarityScore,
  oilConcentration,
}) => {
  try {
    const brandExists = await Brand.findByPk(brandId);
    if (!brandExists) {
      console.error("Brand does not exist");
      return {
        status: 400,
        data: {
          message: "Brand does not exist",
        },
      };
    }

    if (originalPerfumeId) {
      const originalPerfumeExists = await Perfume.findByPk(originalPerfumeId);
      if (!originalPerfumeExists) {
        console.error("Original perfume does not exist");
        return {
          status: 400,
          data: {
            message: "Original perfume does not exist",
          },
        };
      }
    }

    const newPerfume = await Perfume.create({
      brandId,
      originalPerfumeId,
      name,
      type,
      description,
      price,
      size,
      smellDescription,
      releaseDate,
      comparisonDescription,
      similarityScore,
      oilConcentration,
    });

    return {
      status: 200,
      data: {
        message: "Perfume added successfully",
        perfume: newPerfume,
      },
    };
  } catch (error) {
    console.error("Error in addPerfume service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add perfume",
      },
    };
  }
};

module.exports = { addPerfume };
