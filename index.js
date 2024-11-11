const express = require('express');
const database = require("./config/database");
const bodyParser = require('body-parser')

const app = express()
require('dotenv').config()

const port = process.env.PORT
const route= require("./api/v1/routes/index.route");
database.connect();
app.use(bodyParser.json())
route(app);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})