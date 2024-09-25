const express = require("express");
const dotenv = require("dotenv");

const jobs = require("./routes/jobs");
const userAuth = require("./routes/user-auth");

const app = express();
const connectToDB = require("./config/db");
const error = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");

/* Handling any type of uncaught err  */

process.on("uncaughtException", (err) => {
  console.log(`Error occured ->  ${err}`);
  process.exit(1);
});

/* Reading data from req body */

app.use(express.json());

/* Writting a middleware - similar to the Interceptor in UI */

/* const mdwr = (req, res, next) => {
  console.log("hello Intercepted in Mdlwr");
  req.reqMthd = req.method;
  req.URL = req.url;
  next();
}; 

app.use(mdwr);
*/

/* Router import */
/* Job */
app.use("/api/v1", jobs);

/* User Auth */
app.use("/api/v1", userAuth);

/* Wrong Routing error for all other routes which are not matching with the above  */

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} not Found`, 404));
});

/* Error Handder Middleware goes here */

app.use(error);

/* taking all env variable from config env file */

dotenv.config({ path: "./config/config.env" });

/* Connect to DB */
connectToDB();

const PORT = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT} in ${nodeEnv}`);
});

/* If some error occures due to url mismatch 
    that is called unhandled promise rejection 
*/

process.on("unhandledRejection", (err) => {
  console.log(`Error For Promise rejection: ${err}`);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
