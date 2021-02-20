const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/userAuth");
const { checkLogin, connected, closeSession } = require("../controllers/userLogin");
const { serveProfile } = require('../controllers/getProfile');

router.post("/", userRegistration);
router.get("/user", serveProfile);
router.post("/userLogin", checkLogin);
router.get("/connectedUser", connected);
router.get("/closeSession", closeSession);

module.exports = router