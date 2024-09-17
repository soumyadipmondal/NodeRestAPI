const express = require("express");
const { getJobs } = require("../controllers/jobsCntrl");

const router = express.Router();

//router.get("/jobs", (req, res) => {});

/* Using controller technique */
router.route("/jobs").get(getJobs);

module.exports = router;
