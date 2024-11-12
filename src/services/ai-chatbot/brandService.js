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

    if (brands.length === 0) {
      return {
        status: 404,
        data: { message: "No brands found." },
      };
    }

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

const getBrandsByOwnerId = async ({ id }) => {
  try {
    const owner = await Owner.findByPk(id);

    if (!owner) {
      return {
        status: 404,
        data: {
          message: "Owner was not found.",
        },
      };
    }

    const brands = await Brand.findAll({
      where: { ownerId: id },
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
        data: {
          message: "Owner exists but has no brands yet.",
        },
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

const updateBrandId = async ({
  brandId,
  name,
  country,
  description,
  website,
  logoUrl,
}) => {
  try {
    const brand = await Brand.findByPk(brandId);

    if (!brand) {
      return {
        status: 404,
        data: { message: "Brand not found." },
      };
    }

    const fields = { name, country, description, website, logoUrl };
    const updates = Object.keys(fields).reduce((acc, key) => {
      if (fields[key] !== undefined && fields[key] !== null) {
        acc[key] = fields[key].trim();
      }
      return acc;
    }, {});

    if (Object.keys(updates).length === 0) {
      return {
        status: 400,
        data: { message: "No updates provided." },
      };
    }

    await brand.update(updates);

    return {
      status: 200,
      data: {
        message: "Brand updated successfully",
        updatedInfo: brand,
      },
    };
  } catch (error) {
    console.error("Error in updateBrandId service:", error);
    return {
      status: 500,
      data: { message: "An error occurred while updating the brand by ID." },
    };
  }
};

const deleteBrandById = async ({ id }) => {
  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return {
        status: 404,
        data: {
          message: "Brand not found.",
        },
      };
    }

    await brand.destroy();

    return {
      status: 200,
      message: "Brand deleted successfully.",
    };
  } catch (error) {
    console.error("Error in deleteBrandById service:", error);
    throw {
      status: 500,
      message: "Error deleting brand by ID",
    };
  }
};

module.exports = {
  addBrand,
  getAllBrand,
  getBrandsByOwnerId,
  updateBrandId,
  deleteBrandById,
};
