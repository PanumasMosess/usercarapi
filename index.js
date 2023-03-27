const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config()

const {jwtValidate, jwtRefreshTokenValidate} = require('./token/jwtValidate')
const carsRouter = require('./routes/cars.route')
const tokenRouter = require('./routes/apiToken.route')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", jwtValidate , carsRouter);
app.use("/authToken", tokenRouter);
app.use("/refirshToken",jwtRefreshTokenValidate, tokenRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running......");
});
