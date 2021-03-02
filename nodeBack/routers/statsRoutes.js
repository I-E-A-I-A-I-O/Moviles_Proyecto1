const express = require("express");
const router = express.Router();

const { getStats } = require("../controllers/getFormStats");
const { usersStats } = require("../controllers/getUsersStats");

router.get("/forms", getStats);
router.get("/users", usersStats);

module.exports = router;
