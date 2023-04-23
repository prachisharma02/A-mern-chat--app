const mongoose = require("mongoose");

const options = {
  bufferTimeoutMS: 30000, // set the bufferTimeoutMS to 30 seconds
};

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(e => console.log("DB connected"))
    .catch(e => console.log(e))
};
module.exports = connectDB;
