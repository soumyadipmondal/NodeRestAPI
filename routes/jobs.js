const express = require("express");
const {
  getJobs,
  newJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsCntrl");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

//router.get("/jobs", (req, res) => {});

/* Using controller technique CRUD operations */
/* getting jobs */

router.route("/jobs").get(isAuthenticated, getJobs);

/* setting jobs */

router.route("/new/job").post(isAuthenticated, newJob);

/* Update a job details */

router.route("/job/update/:id").put(isAuthenticated, updateJob);

/* Delete a job */

router.route("/job/delete/:id").delete(isAuthenticated, deleteJob);

module.exports = router;
