const express = require("express");
const router = express.Router();
const { userRegistration } = require("../controllers/userAuth")

router.post("/", userRegistration);
router.post("user/:username");

module.exports = router