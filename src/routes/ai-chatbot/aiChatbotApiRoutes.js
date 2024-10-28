const express = require("express");
const router = express.Router();

const perfumeRoutes = require("./perfumeRoutes");
const ownerRoutes = require("./ownerRoutes");
const brandRoutes = require("./brandRoutes");
const noteRoutes = require("./noteRoutes");
const perfumeNoteRoutes = require("./perfumeNoteRoutes");
const comparisonRoutes = require("./comparisonRoutes");

router.use("/perfume", perfumeRoutes);
router.use("/owner", ownerRoutes);
router.use("/brand", brandRoutes);
router.use("/note", noteRoutes);
router.use("/perfume-note", perfumeNoteRoutes);
router.use("/comparison", comparisonRoutes);

module.exports = router;
