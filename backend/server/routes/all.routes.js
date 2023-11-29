// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller.js");
const purchaseController = require("../controllers/purchase.controller");
const carryController = require("../controllers/carry.controller");
const directionController = require("../controllers/direction.controller");

module.exports = function (app) {

  // // Create a new User
  // app.post("/api/user", userController.create);

  // // Retrieve all User
  // app.get("/api/user", auth.isAuthenticated, userController.findAll);

  // // Retrieve a single User with id
  // app.get("/api/user/:id", auth.isAuthenticated, userController.findOne);

  // // Update a User with id
  // app.put("/api/user/:id", auth.isAuthenticated, userController.update);

  // // Sign in
  // app.post("/api/user/signin", auth.signin);

  // // Delete a User with id
  // app.delete("/api/user/:id", userController.delete);

  // Purchases
  app.post("/api/purchase", purchaseController.create);

  app.get("/api/purchase", purchaseController.findAll);

  app.put("/api/purchase/:id", purchaseController.update);

  app.delete("/api/purchase/:id", purchaseController.delete);

  // Carry
  app.post("/api/carry", carryController.create);

  app.get("/api/carry", carryController.findAll);

  app.get("/api/carry/:id", carryController.findOne);

  app.put("/api/carry/:id", carryController.update);

  app.delete("/api/carry/:id", carryController.delete);

  // Directions
  app.post("/api/direction", directionController.create);

  app.get("/api/direction", directionController.findAll);

  app.get("/api/direction/:id", directionController.findOne);

  app.put("/api/direction/:id", directionController.update);

  app.delete("/api/direction/:id", directionController.delete);

}