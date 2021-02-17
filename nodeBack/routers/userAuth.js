const express = require("express");
const router = express.Router();
const { userRegistration } = require("../controllers/userAuth");
const { checkLogin, connected, closeSession }= require("../controllers/userLogin");

router.post("/", userRegistration);
router.post("/userLogin", checkLogin);
router.get("/connectedUser", connected);
router.get("/closeSession", closeSession);

module.exports = router