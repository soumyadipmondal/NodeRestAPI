const express = require("express");

const dotenv = require("dotenv");
const jobs = require("./routes/jobs");

const app = express();
const connectToDB = require("./config/db");

/* Reading data from req body */

app.use(express.json());

/* Writting a middleware - similar to the Interceptor in UI */

const mdwr = (req, res, next) => {
  console.log("hello Intercepted in Mdlwr");
  req.reqMthd = req.method;
  req.URL = req.url;
  next();
};

app.use(mdwr);

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
