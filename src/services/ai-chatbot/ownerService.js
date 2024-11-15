const { Owner, Brand } = require("../../database/models/index");
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
        newOwner: newOwner,
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
      data: {
        message: "All owners fetched successfully.",
        owners: owner,
      },
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
        data: { message: "Owner not found." },
      };
    }

    return {
      status: 200,
      data: {
        message: "Owner fetched successfully.",
        owner: owner,
      },
    };
  } catch (error) {
    console.error("Error in getOwnerById service:", error);
    throw {
      status: 500,
      message: "Error retrieving owner",
    };
  }
};

const updateOwnerById = async ({ id, name, bio }) => {
  try {
    const owner = await Owner.findByPk(id);

    if (!owner) {
      return {
        status: 404,
        data: { message: "Owner not found." },
      };
    }

    const fields = { name, bio };
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

    await owner.update(updates);

    return {
      status: 200,
      data: { message: "Owner updated successfully.", updatedInfo: owner },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "An error occurred while updating the owner.", error },
    };
  }
};

const deleteOwnerById = async ({ id }) => {
  try {
    const owner = await Owner.findByPk(id, {
      include: {
        model: Brand,
        as: "brands",
      },
    });

    if (!owner) {
      return {
        status: 404,
        data: { message: "Owner not found" },
      };
    }

    if (owner.brands && owner.brands.length > 0) {
      return {
        status: 400,
        data: { message: "Cannot delete owner with associated brands" },
      };
    }

    await owner.destroy();

    return {
      status: 200,
      data: { message: "Owner deleted successfully" },
    };
  } catch (error) {
    console.error("Error deleting owner:", error);
    return {
      status: 500,
      data: { message: "An error occurred while deleting the owner" },
    };
  }
};

module.exports = {
  addOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};
