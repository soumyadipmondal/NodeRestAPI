const express = require("express");
const {
  newUser,
  loginUser,
  getUsers,
} = require("../controllers/userAuthCntrl");

const router = express.Router();

/* Create user route */

router.route("/newUser").post(newUser);

/* Get All users */

router.route("/getAllUsers").get(getUsers);

/* login verification */

router.route("/login").post(loginUser);

module.exports = router;
