//registration logic

const asyncHandler = require("express-async-handler");
const User = require("../data/models/UserModel");
const generateToken = require("../Config/generateToken");

//async handler that handles all the error

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body; //this is from user model

  if (!name || !email || !password) {
    res.status(400); //if anything is undefined then for handling error
    throw new Error("Please enter all the fields");
  }

  //user is the model
  try {
    var userExists = await User.findOne({ email }); // email should be unique so if this email exist throw error
  } catch (error) {
    console.log(error, typeof error, "Error");
  }

  if (userExists) {
    return res.status(400).send("user exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
    if (user) {
      res.status(201).json({
        //201 for success
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to Create the User");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
}); //api/user
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
