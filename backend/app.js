const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

app.use('/images' ,express.static(path.join(__dirname, 'server','public', 'images')));

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// database
const db = require("./server/models");
const Role = db.role;

db.sequelize.sync();
//  force: true will drop the table if it already exists
 db.sequelize.sync({forcce: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   initial();
});

app.get("/", (req, res) => {
  res.json("Welcome to Impresioname!" );
});

// routes
require('./server/routes/all.routes')(app);
require("./server/routes/article.routes")(app);
// require('./server/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}