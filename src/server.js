const dBConnection = require("./db/connection");
const express = require("express");
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const cookieParser = require('cookie-parser');

// Handling uncought Error
process.on("uncaughtException", (error) => {
  console.log(`Error : ${error}`);
  console.log("Shuttering down due to Uncaught Error");

  process.exit(1);
});

dBConnection();

const port = process.env.PORT || 4000;
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",userRoute);
app.use("/api", courseRoute);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is listning at http://localhost:${port}`);
});

// Handling unhandled Rejection
// process.on("unhandledRejection", (error) => {
//   console.log(`Error : ${error}`);
//   console.log("Shuttering down due to unhandled promise rejection");

//   server.close(() => {
//     process.exit(1);
//   });
// });
