const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello from Home Page")
})

app.get("/about",(req,res)=>{
    return res.send("Hello from about page")
})

app.get("/random", (req,res)=>{
    return res.send(`You are ${req.query.name}`)
})

app.listen(8000,()=> console.log("Server started"))



