import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (error) => {
      console.log(
        "🚀 ~ Log -> file: config.ts:13 -> connection.on -> error:",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log("🚀 ~ Log -> file: config.ts:8 -> connect -> error:", error);
  }
}
