const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const USING_HTTPS = process.env.USING_HTTPS == "true" ? true : false;
const HOST = process.env.HOST || "localhost";
const HTTP_PORT = process.env.HTTP_PORT || 80; // Puerto para HTTP
const HTTPS_PORT = process.env.HTTPS_PORT || 443; // Puerto para HTTPS

// Configuración para redirección HTTP a HTTPS
const HTTP = express();

if (USING_HTTPS && HTTP_PORT != 443) {
  HTTP.get("*", (req, res) =>
    res.redirect("https://" + HOST + ":" + HTTPS_PORT + req.url)
  );

  HTTP.listen(HTTP_PORT, () => {
    console.log(`HTTP server listening on port ${HTTP_PORT}`);
  });
}

app.use('/images', express.static(path.join(__dirname, 'server', 'public', 'images')));
app.use('/assets', express.static(path.join(__dirname, 'server', 'public', 'assets')));

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// database
const db = require("./server/models");
const Article = db.article;

db.sequelize.sync();
//  force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    // verify auth basic credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, "V3RY#1MP0RT@NT$3CR3T#", function (err, user) {
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

let SERVER = null;

if (USING_HTTPS) {
  const CERTS = () => {
    try {
      return {
        key: fs.readFileSync("./server/.cert/cert.key"),
        cert: fs.readFileSync("./server/.cert/cert.crt"),
      };
    } catch (err) {
      console.log("No certificates found: " + err);
    }
  };
  SERVER = https.createServer(CERTS(), app);
} else {
  SERVER = http.createServer(app);
}

const io = socketIo(SERVER, {
  cors: {
    origin: "*", // Ajusta según tus necesidades
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("new_glasses", (data) => {
    io.emit("new_glasses", { message: data.message });
  });
});

// routes
require("./server/routes/all.routes")(app);
require("./server/routes/article.routes")(app);
require("./server/routes/user.routes")(app);

(USING_HTTPS ? SERVER : app).listen(HTTPS_PORT, () => {
  console.log(`Server is running on port ${HTTPS_PORT}`);
});

module.exports = app;