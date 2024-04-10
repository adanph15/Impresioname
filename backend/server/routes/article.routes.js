module.exports = app => {
  const article = require("../controllers/article.controller");
  var upload = require('../multer/upload');
  var router = require("express").Router();

  router.post("/", upload.single('file'), article.create);

  router.get("/:id", article.findOne);

  router.get("/", article.findAll);

  router.get("/category/:category?", article.findCategory);

  router.put("/:id", upload.single('file'), article.update);

  router.delete("/:id", article.delete);

  app.use("/api/article", router);
}