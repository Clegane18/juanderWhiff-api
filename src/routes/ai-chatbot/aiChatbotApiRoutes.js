const express = require("express");
const router = express.Router();

const perfumeRoutes = require("./perfumeRoutes");
const ownerRoutes = require("./ownerRoutes");
const brandRoutes = require("./brandRoutes");

router.use("/perfume", perfumeRoutes);
router.use("/owner", ownerRoutes);
router.use("/brand", brandRoutes);

module.exports = router;
