const { Brand, Owner } = require("../../database/models/index");
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

const getAllBrand = async () => {
  try {
    const brands = await Brand.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Owner,
          as: "owner",
          attributes: ["id", "name"],
        },
      ],
    });

    return {
      status: 200,
      message: "All brands fetched successfully.",
      data: brands,
    };
  } catch (error) {
    console.error("Error in getAllBrand service:", error);
    throw {
      status: 500,
      message: "Error retrieving brands",
    };
  }
};

const getBrandsByOwnerId = async ({ ownerId }) => {
  try {
    const owner = await Owner.findByPk(ownerId);

    if (!owner) {
      return {
        status: 404,
        data: {
          message: `Owner with ID ${ownerId} was not found.`,
        },
      };
    }

    const brands = await Brand.findAll({
      where: { ownerId },
      order: [["id", "ASC"]],
      include: [
        {
          model: Owner,
          as: "owner",
          attributes: ["id", "name"],
        },
      ],
    });

    if (brands.length === 0) {
      return {
        status: 404,
        message: "No brands found for this owner",
      };
    }

    return {
      status: 200,
      message: "Brands fetched successfully.",
      data: brands,
    };
  } catch (error) {
    console.error("Error in getBrandsByOwnerId service:", error);
    throw {
      status: 500,
      message: "Error retrieving brands by owner ID",
    };
  }
};

module.exports = { addBrand, getAllBrand, getBrandsByOwnerId };
