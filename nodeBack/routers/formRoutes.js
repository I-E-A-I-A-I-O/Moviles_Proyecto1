const express = require("express");
const router = express.Router();

const { getFieldOptions } = require("../controllers/getFomData")
const { getViewForm } = require('../controllers/userViewForm')

router.get("/options", getFieldOptions);
router.get("/viewForm", getViewForm);

module.exports = router;
