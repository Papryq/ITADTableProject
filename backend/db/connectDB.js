import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("mongo_uri", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Successfully connected to the database ${conn.connection.host}`
    );
  } catch (error) {
    console.log("Error cannot connect to the database", error.message);
    process.exit(1); // 1 means failre, 0 success
  }
};
