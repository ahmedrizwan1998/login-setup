var mongoose = require("mongoose");

let connection = () => { mongoose
  .connect(
    "mongodb+srv://ahmed:12345!@cluster0.isg7f.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Cloud not connect to MongoDB..."));
}

module.exports = connection 