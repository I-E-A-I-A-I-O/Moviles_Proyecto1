const express = require("express");
const router = express.Router();

const { getOptions, getMenu } = require("../controllers/getMenuData");
const { saveMenu } = require("../controllers/setMenuData");

router.post("/", saveMenu);
router.get("/options", getOptions);
router.get("/", getMenu);

module.exports = router;