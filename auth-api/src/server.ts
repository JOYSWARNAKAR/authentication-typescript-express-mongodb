import app from "./app";
import { connectDB } from "./config/db";

const port = process.env. PORT || 5700
const MONGO_URI: any = process.env.MONGO_URI

async function s() {
    await connectDB(MONGO_URI)
    app.listen(port, () => {
        console.log("server is running port 5700");
        
    })
}
s();