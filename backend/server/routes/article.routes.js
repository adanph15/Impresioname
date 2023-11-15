module.exports = app => {
    const article = require("../controllers/article.controller");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new Bicycle
    router.post("/", upload.single('file'), article.create);
      
    router.get("/:category?", article.findAll);

    // Retrieve a single Bicycle with id
    router.get("/:id", article.findOne);
  
    // Update a Bicycle with id
    router.put("/:id", article.update);
  
    // Delete a Bicycle with id
    router.delete("/:id", article.delete);
  
    app.use("/api/article", router);
  }