const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connect...");
  } catch (error) {
    console.error(error.message);
    // Exit Process with Failure
    process.exit(1);
  }
};

module.exports = connectDB;
