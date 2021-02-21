const express = require("express");
const router = express.Router();

const { getOptions } = require("../controllers/getMenuData");
const { saveMenu } = require("../controllers/setMenuData");

router.post("/", saveMenu);
router.get("/options", getOptions);

module.exports = router;