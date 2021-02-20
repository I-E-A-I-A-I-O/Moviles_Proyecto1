const express = require("express");
const router = express.Router();

const { getOptions } = require("../controllers/getMenuData")

router.get("/options", getOptions);

module.exports = router;