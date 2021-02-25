const express = require("express");
const router = express.Router();

const { editUsername, editEmail, editGender, 
    editPassword, editAge, editAvatar } = require("../controllers/accountEdit");

router.post("/user/username", editUsername);
router.post("/user/email", editEmail);
router.post("/user/gender", editGender);
router.post("/user/password", editPassword);
router.post("/user/age", editAge);
router.post("/user/avatar", editAvatar);

module.exports = router;