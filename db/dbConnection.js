const mongoose = require("mongoose");

const connect = async () => {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Database connected 🫙 🫙 🫙");
      })
      .catch((err) => {
        console.log(err);
    });
}

module.exports = connect;
