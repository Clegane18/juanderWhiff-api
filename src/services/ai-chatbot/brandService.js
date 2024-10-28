const Brand = require("../../database/models/ai-chatbot/brandModel");
const Owner = require("../../database/models/ai-chatbot/ownerModel");
const { normalizeTexts } = require("../../utils/normalize");

const addBrand = async ({
  ownerId,
  name,
  country,
  description,
  website,
  logoUrl,
}) => {
  try {
    const [normalizedName, normalizedDescription, normalizedCountry] =
      normalizeTexts(name, description, country);

    const existingBrand = await Brand.findOne({
      where: {
        ownerId,
        name: normalizedName,
        country: normalizedCountry,
        description: normalizedDescription,
        website,
        logoUrl,
      },
    });

    if (existingBrand) {
      return {
        status: 400,
        data: {
          message:
            "A brand with the same details already exists under this owner.",
        },
      };
    }

    const ownerExists = await Owner.findByPk(ownerId);
    if (!ownerExists) {
      return {
        status: 404,
        data: {
          message: "Owner does not exist",
        },
      };
    }

    const newBrand = await Brand.create({
      ownerId,
      name: normalizedName,
      country: normalizedCountry,
      description: normalizedDescription,
      website,
      logoUrl,
    });

    return {
      status: 201,
      data: {
        message: "Brand added successfully",
        brand: newBrand,
      },
    };
  } catch (error) {
    console.error("Error in addBrand service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add brand",
      },
    };
  }
};

module.exports = { addBrand };
