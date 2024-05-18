const express = require("express");
const {handleGetAllUsers, handleGetUserById,HandleUpdateUserById,handleDeleteUserById, handleCreateUser} = require("../controllers/user")
const router = express.Router();

//Routes
router.route("/").get(handleGetAllUsers).post(handleCreateUser)

//Another way of writing requests with same route
router.route("/:id").get(handleGetUserById).patch(HandleUpdateUserById).delete(handleDeleteUserById)

module.exports = router;