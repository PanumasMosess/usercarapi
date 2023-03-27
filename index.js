const express = require("express");
const app = express();

require('dotenv').config()

const {jwtValidate, jwtRefreshTokenValidate} = require('./token/jwtValidate')
const carsRouter = require('./routes/cars.route')
const tokenRouter = require('./routes/apiToken.route')

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", jwtValidate , carsRouter);
app.use("/authToken", tokenRouter);
app.use("/refirshToken",jwtRefreshTokenValidate, tokenRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running......");
});
