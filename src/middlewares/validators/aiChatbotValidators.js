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

const validateAddBrand = (req, res, next) => {
  const { error } = addBrandSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateAddNote = (req, res, next) => {
  const { error } = addNoteSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateAddPerfumeNote = (req, res, next) => {
  const dataToValidate = {
    perfumeId: req.params.perfumeId,
    ...req.body,
  };

  const { error } = addPerfumeNoteSchema.validate(dataToValidate, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateComparePerfumes = (req, res, next) => {
  const { error } = comparePerfumesSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateGetComparisonByID = (req, res, next) => {
  const dataToValidate = {
    id: req.params.id,
  };

  const { error } = getComparisonByIDSchema.validate(dataToValidate, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

const validateGetNoteByID = (req, res, next) => {
  const dataToValidate = {
    noteID: req.params.noteID,
  };

  const { error } = getNoteByIDSchema.validate(dataToValidate, {
    abortEarly: false,
  });

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

const addBrandSchema = Joi.object({
  ownerId: Joi.number().integer().required().messages({
    "number.base": "Owner ID must be a number.",
    "any.required": "Owner ID is required.",
  }),
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 100 characters.",
    "any.required": "Name is required.",
  }),
  country: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Country must be a string.",
    "string.empty": "Country cannot be empty.",
    "string.min": "Country must be at least 2 characters long.",
    "string.max": "Country must not exceed 50 characters.",
    "any.required": "Country is required.",
  }),
  description: Joi.string().trim().min(10).allow("").optional().messages({
    "string.base": "Description must be a string.",
    "string.min": "Description must be at least 10 characters long.",
    "string.empty":
      "Description can be empty but if provided must be at least 10 characters.",
  }),
  website: Joi.string().uri().allow("").optional().messages({
    "string.base": "Website must be a string.",
    "string.uri": "Website must be a valid URL.",
  }),
  logoUrl: Joi.string().uri().allow("").optional().messages({
    "string.base": "Logo URL must be a string.",
    "string.uri": "Logo URL must be a valid URL.",
  }),
});

const addNoteSchema = Joi.object({
  fragranceNote: Joi.string().trim().min(1).max(100).required().messages({
    "string.base": "Fragrance note must be a string.",
    "string.empty": "Fragrance note cannot be empty.",
    "string.min": "Fragrance note must be at least 1 character long.",
    "string.max": "Fragrance note must not exceed 100 characters.",
    "any.required": "Fragrance note is required.",
  }),
});

const addPerfumeNoteSchema = Joi.object({
  perfumeId: Joi.number().integer().required().messages({
    "number.base": "Perfume ID must be a number.",
    "any.required": "Perfume ID is required.",
  }),
  noteIds: Joi.array()
    .items(Joi.number().integer().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Note IDs must be an array of numbers.",
      "array.min": "At least one note ID is required.",
      "number.base": "Each Note ID must be a number.",
      "any.required": "Note IDs are required.",
    }),
  noteType: Joi.string().valid("Top", "Middle", "Base").required().messages({
    "string.base": "Note type must be a string.",
    "any.only": "Note type must be one of: Top, Middle, Base.",
    "any.required": "Note type is required.",
  }),
});

const comparePerfumesSchema = Joi.object({
  localPerfumeId: Joi.number().integer().required().messages({
    "number.base": "Local perfume ID must be a number.",
    "any.required": "Local perfume ID is required.",
  }),
  ogPerfumeId: Joi.number().integer().required().messages({
    "number.base": "Original perfume ID must be a number.",
    "any.required": "Original perfume ID is required.",
  }),
  comparisonDescription: Joi.string().required().messages({
    "string.base": "Comparison description must be a string.",
    "any.required": "Comparison description is required.",
  }),
});

const getComparisonByIDSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Comparison ID must be a number.",
    "any.required": "Comparison ID is required.",
  }),
});

const getNoteByIDSchema = Joi.object({
  noteID: Joi.number().integer().required().messages({
    "number.base": "Note ID must be a number.",
    "any.required": "Note ID is required.",
  }),
});

module.exports = {
  validateAddPerfume,
  validateAddOwner,
  validateAddBrand,
  validateAddNote,
  validateAddPerfumeNote,
  validateComparePerfumes,
  validateGetComparisonByID,
  validateGetNoteByID,
};
