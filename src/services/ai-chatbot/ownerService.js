const Owner = require("../../database/models/ai-chatbot/ownerModel");
const { normalizeTexts } = require("../../utils/normalize");

const addOwner = async ({ name, bio }) => {
  try {
    const [normalizedName, normalizedBio] = normalizeTexts(name, bio);

    const existingOwner = await Owner.findOne({
      where: {
        name: normalizedName,
        bio: normalizedBio,
      },
    });

    if (existingOwner) {
      return {
        status: 400,
        data: {
          message: "An owner with the same name and bio already exists.",
        },
      };
    }

    const newOwner = await Owner.create({ name, bio });

    return {
      status: 201,
      data: {
        message: "Owner info added successfully",
        owner: newOwner,
      },
    };
  } catch (error) {
    console.error("Error in addOwner service:", error);
    return {
      status: 500,
      data: {
        message: "Failed to add owner",
      },
    };
  }
};

const getAllOwners = async () => {
  try {
    const owner = await Owner.findAll({
      order: [["id", "ASC"]],
    });

    if (owner.length === 0) {
      return {
        status: 404,
        data: { message: "No owner found." },
      };
    }

    return {
      status: 200,
      message: "All owners fetched successfully.",
      data: owner,
    };
  } catch (error) {
    console.error("Error in getAllOwners service:", error);
    throw {
      status: 500,
      message: "Error retrieving all owners",
    };
  }
};

const getOwnerById = async ({ id }) => {
  try {
    const owner = await Owner.findByPk(id);

    if (!owner) {
      return {
        status: 404,
        data: { message: `Owner with id ${id} not found.` },
      };
    }

    return {
      status: 200,
      message: "Owner fetched successfully.",
      data: owner,
    };
  } catch (error) {
    console.error("Error in getOwnerById service:", error);
    throw {
      status: 500,
      message: "Error retrieving owner",
    };
  }
};

module.exports = { addOwner, getAllOwners, getOwnerById };
