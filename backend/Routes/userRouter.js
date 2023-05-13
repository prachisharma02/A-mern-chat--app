const express = require("express"); //import express
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const router = express.Router(); //creating instance of a router from express

router.route("/").post(registerUser); //sameworking but in diffrent syntax
router.post("/login", authUser); //we will use router to create diffrenet diffrent routers for multiple routing
router.route("/search").get(allUsers);

module.exports = router;
