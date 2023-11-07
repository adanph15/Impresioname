const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
    origin: "*"
    // origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./server/models");
// const Role = db.role;

db.sequelize.sync();
//  force: true will drop the table if it already exists
 db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   initial();
});

// simple route
app.get("/", (req, res) => {
  res.json("Welcome to Impresioname!" );
});

// routes
require('./server/routes/auth.routes')(app);
require('./server/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }