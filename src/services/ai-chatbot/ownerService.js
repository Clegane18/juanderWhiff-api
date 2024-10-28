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

module.exports = { addOwner };
