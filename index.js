const express = require('express');
const database = require("./config/database");
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

const port = process.env.PORT
const route= require("./api/v1/routes/index.route");
app.use(cors())
app.use(cookieParser())
database.connect();

app.use(bodyParser.json())
route(app);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})