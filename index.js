const express = require("express");
const app = express();

require('dotenv').config()

const carsRouter = require('./routes/cars.route')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", carsRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running......");
});
