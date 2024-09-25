const express = require("express");
const { newUser } = require("../controllers/userAuthCntrl");

const router = express.Router();

/* Create user route */

router.route("/newUser").post(newUser);

module.exports = router;
