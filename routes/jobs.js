const express = require("express");

const router = express.Router();

router.get("/jobs", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Routes to get all jobs",
  });
});

module.exports = router;
