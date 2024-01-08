require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine","ejs")

const connect = require("./db/dbConnection");
connect();


app.use("/api", userRoutes);




app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started at PORT ${process.env.PORT} 🚀🚀🚀`);
});
