const express = require("express");
const router = express.Router();

const { getFieldOptions } = require("../controllers/getFomData")
const { getViewForm } = require('../controllers/viewForm')
const { saveForm } = require("../controllers/setFormData");

router.get("/options", getFieldOptions);
router.post("/", saveForm);
router.get("/viewForm", getViewForm);


module.exports = router;
