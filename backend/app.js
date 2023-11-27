const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const jwt = require('jsonwebtoken');


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
const Article = db.article;

db.sequelize.sync();
//  force: true will drop the table if it already exists
 db.sequelize.sync({forcce: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   initial();
});

app.get("/", (req, res) => {
  res.json("Welcome to Impresioname!" );
});



app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if(req.headers.authorization.indexOf('Basic ') === 0){
    // verify auth basic credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [mail, password] = credentials.split(':');

    req.body.mail = mail;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});


// routes
require("./server/routes/all.routes")(app);
require("./server/routes/article.routes")(app);
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);
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

  Article.create({
    id: 1,
    name: "gafa1",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 2,
    name: "gafa2",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 3,
    name: "gafa3",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 4,
    name: "gafa4",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 5,
    name: "gafa5",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 6,
    name: "gafa6",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });
  
  Article.create({
    id: 7,
    name: "gafa7",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 8,
    name: "gafa8",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 9,
    name: "gafa9",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });

  Article.create({
    id: 10,
    name: "gafa10",
    description: "rojo",
    price: 100,
    category: "men",
    stock: 1,
    filename: "./server/public/images/glasses.png"
  });
}