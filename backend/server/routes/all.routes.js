const purchaseController = require("../controllers/purchase.controller");
const carryController = require("../controllers/carry.controller");
const directionController = require("../controllers/direction.controller");

module.exports = function (app) {

  // Purchases
  app.post("/api/purchase", purchaseController.create);

  app.get("/api/purchase", purchaseController.findAll);

  app.get("/api/purchase/user/:userId?", purchaseController.findByUser);

  app.put("/api/purchase/:id", purchaseController.update);

  app.delete("/api/purchase/:id", purchaseController.delete);

  // Carry 
  app.post("/api/carry", carryController.create);

  app.get("/api/carry", carryController.findAll);

  app.get("/api/carry/:article_id/:purchase_id", carryController.findOne);

  app.put("/api/carry/:article_id/:purchase_id", carryController.update);

  app.delete("/api/carry/:article_id/:purchase_id", carryController.delete);

  // Directions
  app.post("/api/direction", directionController.create);

  app.get("/api/direction", directionController.findAll);

  app.get("/api/direction/:id", directionController.findOne);

  app.get("/api/direction/user/:userId?", directionController.findByUser);

  app.put("/api/direction/:id", directionController.update);

  app.delete("/api/direction/:id", directionController.delete);

}