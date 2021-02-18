const express = require("express");
const router = express.Router();

const { serveProfile } = require('../controllers/getProfile');

router.get("/user", serveProfile);

module.exports = router;