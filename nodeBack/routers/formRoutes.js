const express = require("express");
const router = express.Router();

const { getFieldOptions } = require("../controllers/getFomData")

router.get("/options", getFieldOptions);

module.exports = router;
