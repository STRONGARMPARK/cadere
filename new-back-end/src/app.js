const express = require("express");
const weatherRouter = require("./routers/weather-router");
const userRouter = require("./routers/user-router");
const clothingRouter = require("./routers/clothing-router");

//starting mongoose connection to mongodb database
require("./database/database-connect");

//creating basic server
const app = express();

//port it will start running on
const port = 3000;

app.use(express.json());
app.use(weatherRouter);
app.use(clothingRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
