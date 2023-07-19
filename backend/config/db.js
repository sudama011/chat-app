const mongoose =  require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    // console.log(`mongodb connect : ${conn.connection.host}`);
  } catch (error) {
    // console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
