const express = require("express");
const userRouter = require("./routes/user")
const {logReqRes} = require("./middlewares")
const {connectWithMongodb} = require("./connection")
const { type } = require("express/lib/response");
const app = express();
const PORT = 8000;

//Connection
connectWithMongodb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>console.log("Mongodb connected"))

//Middleware pluggin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users",userRouter)


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
