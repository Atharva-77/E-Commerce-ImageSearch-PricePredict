const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    //server to be connected, //Meaning of useNew...?
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //Meaning?
    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectdb;
