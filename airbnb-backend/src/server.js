const express = require("express");
const connectDB = require("../db/mongoose");
connectDB();

//Routers -------------------------------------------------------------------------
const userRouter = require("./routers/user");
const roomRouter = require("./routers/room");

// --------------------------------------------------------------------------------
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(userRouter);
app.use(roomRouter);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//
