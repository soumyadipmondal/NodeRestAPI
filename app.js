const express = require("express");

const dotenv = require("dotenv");
const jobs = require("./routes/jobs");

const app = express();
const connectToDB = require("./config/db");

/* Router import */

app.use("/api/v1", jobs);

/* taking all env variable from config env file */

dotenv.config({ path: "./config/config.env" });

/* Connect to DB */
connectToDB();

const PORT = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT} in ${nodeEnv}`);
});
