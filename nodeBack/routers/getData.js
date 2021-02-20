const express = require("express");
const router = express.Router();

const { serveProfile,serveAvatar } = require('../controllers/getProfile');

router.get("/user", serveProfile);
router.get("/user/avatar", serveAvatar);

module.exports = router;