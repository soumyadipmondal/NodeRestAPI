const express = require("express");
const { getJobs, newJob } = require("../controllers/jobsCntrl");

const router = express.Router();

//router.get("/jobs", (req, res) => {});

/* Using controller technique */
/* getting jobs */
router.route("/jobs").get(getJobs);

/* setting jobs */

router.route("/new/job").post(newJob);

module.exports = router;
