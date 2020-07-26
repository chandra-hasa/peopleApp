//importing mongoose and config dependencies for linking database
const mongoose = require("mongoose");
const config = require("config");

//configuring mongoURI from default.json
const uri = config.get("mongoURI");

const dbConnect = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected!!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = dbConnect;
