//sudo mongod --dbpath 'Users/armstrongpark/Desktop/Mongo/data/db'
const express = require("express");
const userRouter = require("./routers/user-router");
const clothingRouter = require("./routers/clothing-router");
const weatherRouter = require("./routers/weather-router");
require("./db/connect");

const port = 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(clothingRouter);
app.use(weatherRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
