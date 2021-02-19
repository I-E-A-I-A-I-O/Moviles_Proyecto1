const express = require("express");
const router = express.Router();

const { editAccount } = require("../controllers/accountEdit")

router.post("/user", editAccount);

module.exports = router;