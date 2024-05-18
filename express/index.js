const express = require("express");

const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("Hello, you are on homepage")
})

app.get("/about",(req,res)=>{
    res.send("Hello, you are on about page")
})

app.get("/random",(req,res)=>{
    res.send(`Hello, you are ${req.query.name}`)
});

app.listen(port,()=>{
    console.log("Server started");
})