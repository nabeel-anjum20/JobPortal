import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://sa:123@cluster0.bzk9w.mongodb.net/JobPortal"
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
