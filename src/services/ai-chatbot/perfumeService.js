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
        newPerfume: newPerfume,
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

const getAllPerfumes = async () => {
  try {
    const perfumes = await Perfume.findAll({
      include: {
        model: Brand,
        attributes: ["name"],
      },
    });

    if (perfumes.length === 0) {
      return {
        status: 404,
        data: { message: "No perfumes found." },
      };
    }

    return {
      status: 200,
      data: {
        message: "All perfumes fetched successfully.",
        perfumes: perfumes,
      },
    };
  } catch (error) {
    console.error("Error in getAllPerfumes service:", error);
    throw {
      status: 500,
      message: "Error retrieving all perfumes",
    };
  }
};

const getPerfumeById = async ({ id }) => {
  try {
    const perfume = await Perfume.findOne({
      where: { id },
      include: {
        model: Brand,
        attributes: ["name"],
      },
    });

    if (!perfume) {
      return {
        status: 404,
        data: { message: "Perfume not found." },
      };
    }

    return {
      status: 200,
      data: {
        message: "Perfume fetched successfully.",
        perfume: perfume,
      },
    };
  } catch (error) {
    console.error("Error in getPerfumeById service:", error);
    throw {
      status: 500,
      message: "Error retrieving perfume by ID",
    };
  }
};

const updatePerfume = async ({
  perfumeId,
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
    const perfume = await Perfume.findByPk(perfumeId);

    if (!perfume) {
      return {
        status: 404,
        data: { message: "Perfume not found." },
      };
    }

    if (brandId !== undefined && brandId !== null) {
      const brandExists = await Brand.findByPk(brandId);
      if (!brandExists) {
        return {
          status: 400,
          data: { message: "Brand does not exist." },
        };
      }
    }

    if (originalPerfumeId !== undefined && originalPerfumeId !== null) {
      const originalPerfume = await Perfume.findByPk(originalPerfumeId);
      if (!originalPerfume) {
        return {
          status: 400,
          data: { message: "Original perfume does not exist." },
        };
      }

      if (originalPerfume.type !== "OG") {
        return {
          status: 400,
          data: {
            message: "Original perfume must be of type 'og' (original).",
          },
        };
      }
    }

    const fields = {
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

    await perfume.update(updates);

    return {
      status: 200,
      data: {
        message: "Perfume updated successfully",
        updatedPerfume: perfume,
      },
    };
  } catch (error) {
    console.error("Error in updatePerfume service:", error);
    return {
      status: 500,
      data: { message: "An error occurred while updating the perfume." },
    };
  }
};

module.exports = { addPerfume, getAllPerfumes, getPerfumeById, updatePerfume };
