const express = require("express");
const router = express.Router();

const { getFieldOptions, getForm } = require("../controllers/getFomData")
const { saveForm } = require("../controllers/setFormData");
const { saveAnswers } = require("../controllers/saveFormAnswers");

router.get("/options", getFieldOptions);
router.post("/", saveForm);
router.get("/form/:id", getForm);
router.post("/form/:id", saveAnswers);

module.exports = router;
