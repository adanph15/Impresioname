const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const socketIo = require('socket.io');
const https = require('https'); 
const fs = require("fs");

require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use('/images', express.static(path.join(__dirname, 'server', 'public', 'images')));
app.use('/assets', express.static(path.join(__dirname, 'server', 'public', 'assets')));

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./server/models");

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

app.get("/", (req, res) => {
  res.json("Welcome to Impresioname!");
});

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next();

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, "V3RY#1MP0RT@NT$3CR3T#", function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  });
});

require("./server/routes/all.routes")(app);
require("./server/routes/article.routes")(app);
require("./server/routes/user.routes")(app);

const USING_HTTPS = true;
const PORT = process.env.PORT || 443;

if (USING_HTTPS) {
  const CERTS = () => {
    try {
      return {
        key: fs.readFileSync(path.join(__dirname, "./server/.cert/cert.key")),
        cert: fs.readFileSync(path.join(__dirname, "./server/.cert/cert.crt")),
      };
    } catch (err) {
      console.log("No certificates found: " + err);
      return null;
    }
  };
  
  const certs = CERTS();
  
  if (certs) {
    const server = https.createServer(certs, app);
    const io = socketIo(server);

    io.on("connection", (socket) => {
      socket.on("new_glasses", (data) => {
        io.emit("new_glasses", { message: data.message });
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } else {
    console.log("No se pudieron cargar los certificados. El servidor no se iniciará.");
  }
}

module.exports = app;