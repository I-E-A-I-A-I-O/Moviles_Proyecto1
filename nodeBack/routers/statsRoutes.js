const express = reqire("express");
const router = express.Router();

const { getStats } = require("../controllers/getFormStats");

router.get("/forms", getStats);

module.exports = router;
