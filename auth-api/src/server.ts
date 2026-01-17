import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const port = process.env.PORT || 5700
const MONGO_URI: any = process.env.MONGODB_URI as string;

async function startServer() {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log(`🚀 server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

startServer();

/* 
async function s() {
    await connectDB(MONGO_URI)
    app.listen(port, () => {
       console.log(`server is running port ${port}`);
        
    })
}
s();
 */
