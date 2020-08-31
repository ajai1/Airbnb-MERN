const mongoose = require("mongoose");

const connectionURL =
  "mongodb+srv://ajai:ajaiDB1@airbnbcluster.gf0fs.mongodb.net/airbnb-database?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
