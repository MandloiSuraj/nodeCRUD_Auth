const express = require("express");
const app = express();
const userRoutes = require("./Routes/userRoutes");
require("dotenv").config();
const port = process.env.PORT;
const db = require("./dbConnection/db");
const passport=require('./auth');


// passport initialization 
app.use(passport.initialize());

// setting an Authentication middelware to variable to be use anywhere

const LocalAuthMiddleware=passport.authenticate('local',{session:false})

app.get("/",(req, res) => {
  res.send("The main appp is running");
});

app.use("/user",LocalAuthMiddleware,userRoutes);

app.listen(port, () => {
  console.log(`Successfully started the server at ${port} port`);
});
