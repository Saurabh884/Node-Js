const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const { type } = require("express/lib/response");
const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Mongo Error", error));
//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Middleware pluggin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.method}:${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

//Routes

// GET /api/users - List all users
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  res.setHeader("X-myName", "Saurabh Kumar"); //Custom Header

  return res.json(allDbUsers);
});

//GET /users - List of all users
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
       <ul>
       ${allDbUsers
         .map((user) => `<li>${user.firstName}-${user.lastName} </li>`)
         .join("")}
       </ul>
    `;
  return res.send(html);
});

//GET /api/users/1 - Get the user with id 1
// GET /api/users/:id

app.get("/api/users/:id", async(req, res) => {
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: "user not found" });

  return res.json(user);
});

// POST /api/users - Create new user

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "success" });
});

// PATCH /api/users/1 - Edit the user with id 1
app.patch("/api/users/:id", async(req, res) => {
await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
 return res.json({status:"Success"})
});

//DELETE  /api/users/1 - Delete the user with id 1
app.delete("/api/users/:id", async(req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({status:"Success"})
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
