/* import mongoose from "mongoose";

export async function connectDB(uri:string) {
    try {
        await mongoose.connect(uri)
        console.log("mongodb connected");
        
        
    } catch (err) {
        console.error(err);
        
    }
}
 */
import mongoose from "mongoose";

export const connectDB = async (MONGO_URI: string) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in .env");
  }

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
};
