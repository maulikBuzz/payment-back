const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require('cors');

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
 
app.use('/', require("./app/routes/api"))

app.listen(port, (err) => {
  if (err) console.log(`server is not connect :` + err);
  console.log(`running server on from port::::::: http://localhost:${port}`);
});
