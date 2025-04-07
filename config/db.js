import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const options = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    mongoose
      .connect(process.env.MONGO_URI, options)
      .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error handling:", err);
      });

    // console.log(conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error try catch:", error);
    process.exit(1);
  }
};
