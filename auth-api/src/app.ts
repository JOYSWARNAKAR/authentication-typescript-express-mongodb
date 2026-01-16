import express from "express"
import authroutes from "./routes/auth.routes";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("api is working")
})

app.use("/api/auth", authroutes)

export default app;

