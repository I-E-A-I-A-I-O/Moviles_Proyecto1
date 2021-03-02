const express = require("express");
const router = express.Router();

const { getStats } = require("../controllers/getFormStats");
const { usersStats, userStats } = require("../controllers/getUsersStats");

router.get("/forms", getStats);
router.get("/users", usersStats);
router.get("/users/user", userStats);

module.exports = router;
