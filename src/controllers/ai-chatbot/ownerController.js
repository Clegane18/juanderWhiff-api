const ownerService = require("../../services/ai-chatbot/ownerService");

const addOwner = async (req, res) => {
  const result = await ownerService.addOwner({
    name: req.body.name,
    bio: req.body.bio,
  });
  return res.status(result.status).json(result.data);
};

module.exports = { addOwner };
