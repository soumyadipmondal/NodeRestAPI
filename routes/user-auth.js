const express = require("express");
const { newUser, loginUser } = require("../controllers/userAuthCntrl");

const router = express.Router();

/* Create user route */

router.route("/newUser").post(newUser);

/* login verification */

router.route("/login").post(loginUser);

module.exports = router;
