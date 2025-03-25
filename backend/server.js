//Importing express
const express = require("express");

//Importing dotenv that allows to load environment variables from a .env file into process.env
require("dotenv").config();

//Importing Mongoose to connect to the database on mongodb atlas
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user");

//Middleware build into Express to parse incoming JSON requests
app.use(express.json());

app.use("/user", userRoutes);

//Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
      console.log("Connected to the Database successfully");
    });
  })
  .catch((error) => console.log(error));
