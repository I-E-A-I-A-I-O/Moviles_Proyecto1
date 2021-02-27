const express = require("express");
const router = express.Router();

const { getFieldOptions } = require("../controllers/getFomData");
const { saveForm } = require("../controllers/setFormData");

router.get("/options", getFieldOptions);
router.post("/", saveForm);

module.exports = router;
