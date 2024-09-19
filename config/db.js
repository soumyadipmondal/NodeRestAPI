const mongoose = require("mongoose");

/* var uri = "mongodb://localhost:27017/meancourse";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
}); */

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(con.connections);
      console.log("Database is connected Successfully");
    })
    .catch((err) => console.log("Some error has occured" + err));
};

module.exports = connectToDB;
