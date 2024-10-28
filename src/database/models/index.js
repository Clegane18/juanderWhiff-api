const sequelize = require("../db");

const Owner = require("./ai-chatbot/ownerModel");
const Brand = require("./ai-chatbot/brandModel");
const Perfume = require("./ai-chatbot/perfumeModel");
const Note = require("./ai-chatbot/noteModel");
const PerfumeNote = require("./ai-chatbot/perfumeNoteModel");
const Comparison = require("./ai-chatbot/comparisonModel");

// Owners and Brands
Owner.hasMany(Brand, {
  foreignKey: "ownerId",
  onDelete: "CASCADE",
});
Brand.belongsTo(Owner, {
  foreignKey: "ownerId",
});

// Brands and Perfumes
Brand.hasMany(Perfume, {
  foreignKey: "brandId",
  onDelete: "CASCADE",
});
Perfume.belongsTo(Brand, {
  foreignKey: "brandId",
});

// Perfumes and Original Perfumes (Self-reference)
Perfume.belongsTo(Perfume, {
  as: "OriginalPerfume",
  foreignKey: "originalPerfumeId",
});

// Perfumes and Notes (Many-to-Many through PerfumeNote)
Perfume.belongsToMany(Note, {
  through: PerfumeNote,
  foreignKey: "perfumeId",
  otherKey: "noteId",
  onDelete: "CASCADE",
});
Note.belongsToMany(Perfume, {
  through: PerfumeNote,
  foreignKey: "noteId",
  otherKey: "perfumeId",
  onDelete: "CASCADE",
});

// Optional: Comparisons
Comparison.belongsTo(Perfume, {
  as: "Perfume",
  foreignKey: "perfumeId",
});
Comparison.belongsTo(Perfume, {
  as: "OriginalPerfume",
  foreignKey: "originalPerfumeId",
});

module.exports = {
  Owner,
  Brand,
  Perfume,
  Note,
  PerfumeNote,
  User,
  Comparison,
  sequelize,
};
