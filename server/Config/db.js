const mongoose = require('mongoose');


const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected")
  } catch(err) {
    console.log('connect DB Error', err)
  }
}

module.exports = connectDB;