const express = require("express");
const {
  getJobs,
  newJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsCntrl");

const router = express.Router();

//router.get("/jobs", (req, res) => {});

/* Using controller technique CRUD operations */
/* getting jobs */

router.route("/jobs").get(getJobs);

/* setting jobs */

router.route("/new/job").post(newJob);

/* Update a job details */

router.route("/job/update/:id").put(updateJob);

/* Delete a job */

router.route("/job/delete/:id").delete(deleteJob);

module.exports = router;
