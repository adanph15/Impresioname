// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");
const articleController = require("../controllers/article.controller");
const purchaseController = require("../controllers/purchase.controller");
const carryController = require("../controllers/carry.controller");
const directionController = require("../controllers/direction.controller");

var upload = require('../multer/upload');

var router = require("express").Router();

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  //   app.post(
  //     "/api/auth/signup",
  //     [
  //       verifySignUp.checkDuplicateUsernameOrEmail,
  //       verifySignUp.checkRolesExisted
  //     ],
  //     controller.signup
  //   );

  //   app.post("/api/auth/signin", controller.signin);

  //   app.get("/api/auth/:id", controller.findOne);

  //   app.put("/api/auth/:id", controller.update);


  // Articles
  // app.post("/api/article", upload.single('file'), articleController.create);

  // app.get("/api/article", articleController.findAll);

  // app.get("/api/article/:category", articleController.findAllCondition);

  // app.get("/api/article/:id", articleController.findOne);

  // app.put("/api/article/:id", upload.single('file'), articleController.update);

  // app.delete("/api/article/:id", articleController.delete);

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