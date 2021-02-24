const express = require("express");
const router = express.Router();

const { editUsername } = require("../controllers/accountEdit")

router.post("/user/username", editUsername);

module.exports = router;