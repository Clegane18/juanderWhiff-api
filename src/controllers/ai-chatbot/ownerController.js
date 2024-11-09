const ownerService = require("../../services/ai-chatbot/ownerService");

const addOwner = async (req, res) => {
  const result = await ownerService.addOwner({
    name: req.body.name,
    bio: req.body.bio,
  });
  return res.status(result.status).json(result.data);
};

const getAllOwners = async (req, res) => {
  const result = await ownerService.getAllOwners();
  return res.status(result.status).json(result.data);
};

const getOwnerById = async (req, res) => {
  const result = await ownerService.getOwnerById({
    id: req.params.id,
  });
  return res.status(result.status).json(result.data);
};

const updateOwnerById = async (req, res) => {
  const result = await ownerService.updateOwnerById({
    ownerId: req.params.ownerId,
    name: req.body.name,
    bio: req.body.bio,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addOwner, getAllOwners, getOwnerById, updateOwnerById };
