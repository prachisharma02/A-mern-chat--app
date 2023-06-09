const { json } = require("express");
const express = require("express"); // to import express
const connectDB = require("./backend/Config/db");
const dotenv = require("dotenv");
const routes = require("./backend/Routes/userRouter");
const chatroutes = require("./backend/Routes/chatRouter");
const messageroutes = require("./backend/Routes/messageroutes");
const {
  notFound,
  errorHandler,
} = require("./backend/middleware/errorMiddleware");
const app = express(); //create instance of express variable
dotenv.config();
// to get the API
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully");
});
app.use("/sample", routes);
app.use("/api/chat", chatroutes);
app.use("/api/message", messageroutes);

app.use(notFound);
app.use(errorHandler);
//const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`server started on PORT 5000`)); //to start own server on the port
