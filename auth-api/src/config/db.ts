import mongoose from "mongoose";

export async function connectDB(uri:string) {
    try {
        await mongoose.connect(uri)
        console.log("mongodb connected ");
        
        
    } catch (err) {
        console.log(err);
        
    }
}