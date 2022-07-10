const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log("mongodb connected to server");
  });
};

module.exports = connectDatabase;
