module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/signup", users.create);

  // Sign in
  router.post("/signin", auth.signin);

  // Create a new Admin
  router.post("/admin", users.createAdmin);

  // Retrieve all User
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", auth.isAuthenticated, users.findOne);

  router.get("/findOne/:id", users.findOne);

  router.get("/direction/:id", users.getUserDirections);

  // Update a User with id
  router.put("/:id", users.update);
  // router.put("/:id", auth.isAuthenticated, users.update);

  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};