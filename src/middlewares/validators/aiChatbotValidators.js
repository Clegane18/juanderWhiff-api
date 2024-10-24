const Joi = require("joi");

const validateAddPerfume = (req, res, next) => {
  const { error } = createPerfumeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateAddOwner = (req, res, next) => {
  const { error } = createOwnerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

// Schemas
const createPerfumeSchema = Joi.object({
  brandId: Joi.number().integer().required().messages({
    "number.base": "Brand ID must be a number.",
    "number.integer": "Brand ID must be an integer.",
    "any.required": "Brand ID is a required field.",
  }),
  originalPerfumeId: Joi.number().integer().allow(null).messages({
    "number.base": "Original Perfume ID must be a number.",
    "number.integer": "Original Perfume ID must be an integer.",
  }),
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "any.required": "Name is a required field.",
  }),
  type: Joi.string().valid("OG", "Local").required().messages({
    "string.base": "Type must be a string.",
    "any.only": 'Type must be either "OG" or "Local".',
    "any.required": "Type is a required field.",
  }),
  description: Joi.string().allow(null).messages({
    "string.base": "Description must be a string.",
  }),
  price: Joi.number().allow(null).precision(2).optional().messages({
    "number.base": "Price must be a number.",
    "number.precision": "Price must have at most 2 decimal places.",
  }),
  size: Joi.string().allow(null).messages({
    "string.base": "Size must be a string.",
  }),
  smellDescription: Joi.string().allow(null).messages({
    "string.base": "Smell Description must be a string.",
  }),
  releaseDate: Joi.date().iso().allow(null).messages({
    "date.base": "Release Date must be a valid date.",
    "date.format": "Release Date must be in ISO format.",
  }),
  comparisonDescription: Joi.string().allow(null).messages({
    "string.base": "Comparison Description must be a string.",
  }),
  similarityScore: Joi.number().min(0).max(100).allow(null).messages({
    "number.base": "Similarity Score must be a number.",
    "number.min": "Similarity Score must be at least 0.",
    "number.max": "Similarity Score must be at most 100.",
  }),
  oilConcentration: Joi.string()
    .valid(
      "Extrait De Parfum",
      "Eau De Parfum",
      "Eau De Toilette",
      "Eau De Cologne"
    )
    .required()
    .messages({
      "string.base": "Oil Concentration must be a text string.",
      "any.only":
        "Oil Concentration must be one of the following: Extrait De Parfum, Eau De Parfum, Eau De Toilette, Eau De Cologne.",
      "any.required": "Oil Concentration is a required field.",
    }),
});

const createOwnerSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 3 characters long.",
    "any.required": "Name is required.",
  }),
  bio: Joi.string().trim().min(10).allow("").optional().messages({
    "string.base": "Bio must be a string.",
    "string.min": "Bio must be at least 10 characters long.",
    "string.empty":
      "Bio can be empty but if provided must be at least 10 characters.",
  }),
});

module.exports = { validateAddPerfume, validateAddOwner };
