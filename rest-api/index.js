const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//Middleware pluggin
app.use(express.urlencoded({ extended: false }));

//Creating middleware
// app.use((req,res,next)=>{

//     console.log("Hello from middleware 1");
//     req.myUserName = 'Saurabh@fullstackdev.com'
//     // return res.end("hey loop break") //break the operation
//     next();

// })

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
  console.log("Hello from middleware 2", req.myUserName);
  next();
});

//Routes

// GET /api/users - List all users
app.get("/api/users", (req, res) => {
  console.log("I am in get route", req.myUserName);
  res.setHeader("X-myName", "Saurabh Kumar"); //Custom Header
  //Always add X to custom header
  return res.json(users);
});

//GET /users - List of all users
app.get("/users", (req, res) => {
  const html = `
       <ul>
       ${users.map((user) => `<li>${user.first_name} </li>`).join("")}
       </ul>
    `;
  return res.send(html);
});

//GET /api/users/1 - Get the user with id 1
// GET /api/users/:id

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if(!user) return res.status(404).json({error:"user not found"})

  return res.json(user);
});

// POST /api/users - Create new user

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

// PATCH /api/users/1 - Edit the user with id 1
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUserData = req.body; // New user data from request body

  // Find the index of the user with the specified ID
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    // If user with the specified id is not found
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  // Update the user's data with the new values
  users[userIndex] = { ...users[userIndex], ...updatedUserData };

  // Write the updated data back to the JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to update user" });
    }
    return res.json({
      status: "success",
      message: "User updated successfully",
    });
  });
});

//DELETE  /api/users/1 - Delete the user with id 1
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const particularUser = users.find((user) => user.id === id);

  finalData = users.filter((user) => user.id !== particularUser.id);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(finalData), (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to delete user" });
    }
    return res.json({
      status: "success",
      message: "User deleted successfully",
    });
  });
});

//Another way of writing requests with same route

// app.route("/api/users/:id").get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id===id);

//    return res.json(user)
// }).put((req,res)=>{
//     res.json({status:"pending"})
// }).delete((res,res)=>{
//     return res.json({status:"pending"})
// })

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
