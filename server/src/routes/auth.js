const express = require("express");
const { register, login, forgotPassword } = require("../controllers/auth");
const { roleValidator } = require("../middlewares/roleValidtor");
const router = express.Router();

router.post("/register", roleValidator, register);
router.post("/login", roleValidator, login);
router.post("/forgotpassword", roleValidator, forgotPassword);

module.exports = router;
