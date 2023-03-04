const express = require("express");
const { register, login, forgotPassword } = require("../controllers/auth");
const { typeValidtor } = require("../middlewares/typeValidtor");
const router = express.Router();

router.post("/register", typeValidtor, register);
router.post("/login", typeValidtor, login);
router.post("/forgotpassword", typeValidtor, forgotPassword);

module.exports = router;
